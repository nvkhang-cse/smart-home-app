import React, {Component, useEffect} from 'react';
import _ from "lodash";
import { View, Text, TouchableOpacity, FlatList, Switch} from "react-native";
import styles from '../style/screen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import getData from '../data/getData';
import LightData from '../data/LightData';
import {mqtt} from "../mqtt/MQTT";
import RoomsData from '../data/RoomsData';
import { ScrollView } from 'react-native-gesture-handler';

function RoomName(){
    roomName = [];
    RoomsData.forEach(item => {
        roomName[item.key] = item.name;
    });
    return roomName;
}

var roomName = RoomName();

function filter(data, id) {
    if(id === "0")
        return data;
    return data.filter(item => item.room === id);
}

var data = [];
var countLeft = 0;

class LightList extends Component {
    // Light of each room
    constructor(props) {
        super(props);
        this.state = {
            listLights: [],
            id: props.id,
            isLoading: true
        }
    }

    async loadData(){
        getData("relay").then(res => {
            res = filter(res, this.state.id);
            this.setState({
                listLights: res,
                isLoading: false
            });
            countLeft = Math.ceil(this.state.listLights.length/2);
        });
    }

    async componentDidMount() {
        this.loadData();
        setInterval(() => {
            this.loadData();
        }, 2000);
    }

    setLightState = (value, index) => {
        const tempData = _.cloneDeep(this.state.listLights);
        tempData[index].state = value ? "1" : "0";
        mqtt.changeLight(tempData[index].key, tempData[index].state);
        this.setState({listLights: tempData});
    }

    lightItemLeft = ({item, index}) => (
        <View style={styles.lightCard}>
            <View style={styles.lightItem}>
                <View style={styles.headerLightItem}>
                    <Text style={styles.nameLight}>{item.name}</Text>
                    <Switch
                        value={item.state === "1" ? true : false}
                        style={styles.toggleLight}
                        onValueChange={(value) => this.setLightState(value,index)}
                    />
                </View>
                <View style={styles.bodyLightItem}>
                    <MaterialCommunityIcons style={item.state == "1"?styles.lightOn:styles.lightOff} name={item.state == "1"?'lightbulb-on':'lightbulb-off'} size={50} color={"#000000"} />
                </View>
            </View>
        </View>
    )
    
    lightItemRight = ({item, index}) => (
        <View style={styles.lightCard}>
            <View style={styles.lightItem}>
                <View style={styles.headerLightItem}>
                    <Text style={styles.nameLight}>{item.name}</Text>
                    <Switch
                        value={item.state === "1" ? true : false}
                        style={styles.toggleLight}
                        onValueChange={(value) => this.setLightState(value, index + countLeft)}
                    />
                </View>
                <View style={styles.bodyLightItem}>
                    <MaterialCommunityIcons style={item.state == "1"?styles.lightOn:styles.lightOff} name={item.state == "1"?'lightbulb-on':'lightbulb-off'} size={50} color={"#000000"} />
                </View>
            </View>
        </View>
    )

    render() {
        if (this.state.isLoading == true) {
            return <View><Text>Loading...</Text></View>;
        } else {
            var data= this.state.listLights;
            var right = Math.floor(data.length/2);
            var left = data.length - right;
            var dataLeft = data.slice(0,left);
            var dataRight = data.slice(left,data.length);

            return (
                <View style = {styles.container}>
                    <View style={styles.containerLight}>
                        <View style={styles.lightCardCol}>
                            <FlatList
                                data={dataLeft}
                                renderItem={this.lightItemLeft}
                            />
                        </View>
                        <View style={styles.lightCardCol}>
                            <FlatList
                                data={dataRight}
                                renderItem={this.lightItemRight}
                            />
                        </View>
                    </View>
                </View>
            )
        }
    }
}

class LightGeneral extends Component{
    constructor(){
        super();
        this.state = {
            data: [],
            isLoading: true
        }
    }
    //const [listLight, setListLight] = React.useState(filter(LightData,itemChoose));

    async loadData(){
        getData("relay").then(res => {
            res = grouping(res);
            res = convertObjectToArray(res);
            this.setState({
                data: res,
                isLoading: false
            });
        });
    }

    async componentDidMount() {
        this.loadData();
        setInterval(() =>{
            this.loadData();
        }, 2000);
    }

    setLightState = (value, index, idRoom) => {
        const tempData = _.cloneDeep(this.state.data);
        tempData[idRoom - 1][index].state = value ? "1" : "0";
        mqtt.changeLight(tempData[idRoom - 1][index].key, tempData[idRoom - 1][index].state);
        this.setState({data: tempData});
    }

    LightItem = ({item,index}) => (
        <View style={styles.lightCard}>
            <View style={styles.lightItem}>
                <View style={styles.headerLightItem}>
                    <Text style={styles.nameLight}>{item.name}</Text>
                    <Switch
                        value={item.state == "1" ? true : false}
                        style={styles.toggleLight}
                        onValueChange={(value) => this.setLightState(value, index, item.room)}
                    />
                </View>
                <View style={styles.bodyLightItem}>
                    <MaterialCommunityIcons style={item.state == "1"?styles.lightOn:styles.lightOff} name={item.state == "1"?'lightbulb-on':'lightbulb-off'} size={50} color={"#000000"} />
                </View>
            </View>
        </View>
    )
    LightGeneralItem = ({item, index}) => (
        <View style={styles.lightSystemMode}>
            <View style={styles.rowLightMode}>
                <Text style={styles.titleRow}>{roomName[index + 1]}</Text>
            </View>
            <ScrollView>
                <FlatList
                    data ={item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={this.LightItem}>
                </FlatList>
            </ScrollView>
        </View>
    )
    render(){
        if (this.state.isLoading == true) {
            return <View><Text>Loading...</Text></View>;
        } else {
            return(
                <View>
                    <FlatList
                        data = {this.state.data}
                        renderItem={this.LightGeneralItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            )
        }
    }
}

function groupByKey(array, key) {
    return array
        .reduce((hash, obj) => {
            if(obj[key] === undefined) return hash; 
            return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
        }, {})
}

function grouping(data){
    return groupByKey(data, 'room')
}

function convertObjectToArray(obj){
    var entries = Object.entries(obj);
    var arr = [];
    entries.forEach(([key, value]) => {
        arr[key] = value;
    })
    arr.shift();
    return arr;
}

function LightScreen({route}) {
    const {name, id} = route.params;
    if (id == "0") {
        return (
            <LightGeneral/>
        )
    }
    else {
        return (
            <LightList id={id}/>
        );
    }
}

export default LightScreen;

