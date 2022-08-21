import AsyncStorage from '@react-native-community/async-storage';
import {topicList} from './topics';
import messHandler from './messHandler';
import React, { Component } from 'react';
import convertRequest from './convertRequest';
import init from 'react_native_mqtt';
import {CSE_BBC_key, CSE_BBC1_key} from './serverKey';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

const CLIENT_1 = 'client1';
const CLIENT_2 = 'client2';

class MQTT extends Component{

  constructor(){
    super();
    this.onMessageArrived = this.onMessageArrived.bind(this);
    this.onConnectionLost = this.onConnectionLost.bind(this);
    
    var clientID = "Client" + new Date().getTime();

    this.client1 = new Paho.MQTT.Client("io.adafruit.com", 80, clientID,);
    this.client1.onMessageArrived = this.onMessageArrived;
    this.client1.onConnectionLost = this.onConnectionLost;

    this.client2 = new Paho.MQTT.Client("io.adafruit.com", 80, clientID + '2',);
    this.client2.onMessageArrived = this.onMessageArrived;
    this.client2.onConnectionLost = this.onConnectionLost;

    this.state = {
      isClient1Connected: false,
      isClient2Connected: false
    };

    this.connect();
  }

  connect = (connectionType="both") => {
    const options1 = { 
      onSuccess: this.onConnect,
      useSSL: false ,
      userName: 'CSE_BBC',
      password: CSE_BBC_key,
      onFailure: (e) => {console.log("Here is the error: " , e); }
    }
    
    const options2 = { 
      onSuccess: this.onConnect,
      useSSL: false ,
      userName: 'CSE_BBC1',
      password: CSE_BBC1_key,
      onFailure: (e) => {console.log("Here is the error: " , e); }
    }
    switch (connectionType) {
      case CLIENT_1:
        this.client1.connect(options1);
        break;
      case CLIENT_2:
        this.client2.connect(options2);
        break;
      default:
        this.client1.connect(options1);
        this.client2.connect(options2);
        break;
    }
  }

  onMessageArrived(entry) {
    var message = entry.payloadString;
    console.log("onMessageArrived: " + message);
    this.handleMessage(entry.topic, message);
  }

  onConnect = () => {
    this.state.isClient1Connected = true;
    console.log("Client 1 is connected");
    this.state.isClient2Connected = true;
    console.log("Client 2 is connected");
    this.subscribeAllTopic();
  };

  subscribeTopic(topic) {
    try {
      if (this.isClient1(topic)) {
        if (this.state.isClient1Connected) {
          this.client1.subscribe(topic, 
            {onSuccess: () => (console.log("Done: Subscribed to topic: " + topic)),
            onFailure: (e) => (console.log(e))});
        } else {
          // this.connect(CLIENT_1);
        }
      } else {
        // console.log("Subscribe");
        if (this.state.isClient2Connected) {
          this.client2.subscribe(topic, 
            {onSuccess: () => (console.log("Done: Subscribed to topic: " + topic)),
            onFailure: (e) => (console.log(e))});
        } else {
          // this.connect(CLIENT_2);
        }
      }
    } catch(e) {
      console.error(e);
    }
  }

  /**
   * @param lightId the 'key' of light
   * @param state 0: Off, 1: On
  */
  changeLight(lightId, state) {
    const data = {
      "key": String(lightId),
      "state": String(state),
    }
    this.sendPublishMessage("relay", data);
  }

  /**
   * @param type "relay" -> turn on/off light
   * @param data like the current format of data eg: {"key": ..., "name": ..., "url": ..., "state": ...}.
  */
  sendPublishMessage(type, data) {
    try {
      var message = convertRequest.convert(type, data);
      var topic = topicList.filter(topic => topic.search(type) != -1)[0];
      if (topic == []) {
        console.error("Cannot find topic!");
      } else {
        // message = {"id":"1","name":"TEMP-HUMID","data":"26-45","unit":"C-%"};
        // topic = "CSE_BBC/feeds/bk-iot-temp-humid";
        console.log(`Topic: ${topic}, message:`, message);
        this.publishMessage(topic, message);
      }
    } catch(e) {
      console.error(e);
    }
  }

  publishMessage(topic, msg){
    try {
      msg = JSON.stringify(msg);
      let message = new Paho.MQTT.Message(msg);
      message.destinationName = topic;
      if (this.isClient1(topic)) {
        if (this.state.isClient1Connected) {
          this.client1.send(message);
          console.log("Message sent: " + message.payloadString);
        } else {
          // this.connect(CLIENT_1);
        }
      } else {
        if (this.state.isClient2Connected) {
          this.client2.send(message);
          console.log("Message sent: " + message.payloadString);
        } else {
          // this.connect(CLIENT_2);
        }
      }
    }
    catch(e){
      console.log(e);
    }
  }

  isClient1(topic) {
    if (topic.search("CSE_BBC1") == -1) {
      return true;
    } else{
      return false;
    }
  }

  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
      this.state.isConnected = false;
    }
  }

  handleMessage(topic, data) {
    try {
      topic = topic.split('/')[2]; // Get the part has 'bk-iot-light'
      switch(topic) {
        case 'bk-iot-button':       messHandler.handleButton(data); break;
        case 'bk-iot-relay':        messHandler.handleRelay(data); break;
        case 'bk-iot-temp-humid':   messHandler.handleTempHumid(data); break;
        case 'bk-iot-light':        messHandler.handleLight(data); break;
        case 'bk-iot-gas':          messHandler.handleGas(data); break;
        case 'bk-iot-magnetic':     messHandler.handleMagnetic(data); break;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async subscribeAllTopic() {
    let list = new Promise((resolve, reject)=>resolve(topicList.map(topic => this.subscribeTopic(topic))));
    return list;
  }
}

export const mqtt = new MQTT();