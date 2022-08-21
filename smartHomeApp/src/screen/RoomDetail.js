import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { View, Text, Button, Touchable, TouchableOpacity, Image } from "react-native";
import styles from '../style/screen'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Door from './Door';
import Light from './Light';
import Temperature from './Temperature';
import Gas from './Gas';
import Humidity from './Humidity';
import Window from './Window';
import { Component } from 'react';
import getData from '../data/getData';

function filter(data, id) {
    if(id === "0")
        return data;
    return data.filter(item => item.room === id);
}

class Room extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            navigation: props.navigation,
            room: [],
            doors: [],
            lights: [],
            id: props.id,
            isLoadingRoom: true,
            isLoadingDoor: true,
            isLoadingLight: true
        }
    }
    
    async loadData(){
        getData("room").then(res => {
            res = res[this.state.id-1]
            this.setState({
                room: res,
                isLoadingRoom: false
            });
        });
        getData("relay").then(res => {
            res = filter(res, this.state.id);
            this.setState({
                lights: res,
                isLoadingLight: false
            });
        });
        getData("door").then(res => {
            res = filter(res, this.state.id);
            this.setState({
                doors: res,
                isLoadingDoor: false
            });
        });
    }
    
    async componentDidMount() {
        this.loadData();
        setInterval(() => {
            this.loadData();
        }, 2000);
    }

    getDoorLocked(isLock) {
        return this.state.doors.filter(door => {
            return door.state == isLock;
        }).length;
    }

    getLightState(state) {
        return this.state.lights.filter(light => {
            return light.state == state;
        }).length;
    }

    render() {
        if (this.state.isLoadingRoom == true || this.state.isLoadingDoor == true || this.state.isLoadingLight == true) {
            return <View><Text>Loading...</Text></View>;
        } else {
            const id = this.state.id;
            const name = this.state.name;
            const navigation = this.state.navigation;
            return (
                <View style = {styles.container}>
                    <View style={styles.containerRoomDetail}>
                        <View style={styles.roomDetailSceenImage}>
                            <Image
                                source = {{uri:"https://c1.staticflickr.com/9/8725/28609601352_59ebbba9b5_o.png"}}
                                style={styles.roomDetailSceenImage}>
                            </Image>
                        </View>
        
                        <View style={styles.featureRow}>
                            <TouchableOpacity style={styles.roomDetailBtnLeft} onPress={()=>navigation.navigate("Door", {name: name, id: id})}>
                                <FontAwesome5Pro name={'door-open'} size={30} />
                                <Text>{this.getDoorLocked(true)} Locked </Text>
                                <Text>{this.getDoorLocked(false)} Unclocked</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.roomDetailBtnRight} onPress={()=>navigation.navigate("Window", {name: name, id: id})}>
                                <MaterialCommunityIcons name="window-closed-variant" size={30} />
                                <Text>Light Intensity: {this.state.room.lightIntensity}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.featureRow}>
                            <TouchableOpacity style={styles.roomDetailBtnLeft} onPress={()=>navigation.navigate("Temperature", {name:"Temperature " + name, id: id})}>
                                <FontAwesome5Pro name={'temperature-low'} size={30} />
                                <Text>{this.state.room.temperature}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.roomDetailBtnRight} onPress={()=>navigation.navigate("Light", {name: name, id: id})}>
                                <MaterialCommunityIcons name="lightbulb-on" size={30} />
                                <Text>{this.getLightState(1)} On - {this.getLightState(0)} Off</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.featureRow}>
                            <TouchableOpacity style={styles.roomDetailBtnLeft} onPress={()=>navigation.navigate("Gas", {name:"Gas " + name, id: id})}>
                                <MaterialCommunityIcons name="gas-cylinder" size={30} />
                                <Text>{this.state.room.gasConcentration}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.roomDetailBtnRight} onPress={()=>navigation.navigate("Humidity", {name:"Water " + name, id: id})}>
                                <MaterialCommunityIcons name="water-percent" size={30} />
                                <Text>{this.state.room.humidity}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }
    }
}

function RoomDetail({route, navigation}){
    const {name, id} = route.params;
    return <Room name={name} id={id} navigation={navigation}/>
}

const RoomDetailStack = createStackNavigator();

function RoomDetailStackScreen({route, navigation}) {
    const {name, id} = route.params;
    return (
        <RoomDetailStack.Navigator>
            <RoomDetailStack.Screen
                name="RoomDetail"
                component={RoomDetail}
                initialParams={{
                    name: name,
                    id: id,
                }}
                options={{
                    title: name,
                }}
            />
            <RoomDetailStack.Screen name="Door" component={Door}/>
            <RoomDetailStack.Screen name="Light" component={Light}/>
            <RoomDetailStack.Screen name="Gas" component={Gas}/>
            <RoomDetailStack.Screen name="Temperature" component={Temperature}/>
            <RoomDetailStack.Screen name="Humidity" component={Humidity}/>
            <RoomDetailStack.Screen name="Window" component={Window}/>
        </RoomDetailStack.Navigator>
    )
}

export default RoomDetailStackScreen;