import React, {Component} from 'react';
import _ from "lodash";
import { View, Text, Switch, FlatList, TouchableOpacity, Image} from "react-native";
import styles from '../style/screen'
import RoomsData from '../data/RoomsData';
import getData from '../data/getData';

var data = [];


class HumidityList extends Component {
    constructor() {
        super();
        this.state = {
            listRooms : data
        } 
    }

    async loadData(){
        getData("room").then((res) => {
            if (res != this.state.listRooms){
                this.setState({listRooms: res});
            }
        });
    }

    async componentDidMount(){
        this.loadData();
        setInterval(() => {
            this.loadData();
        }, 2000);
    }

    humidityItem = ({item, index}) => (
        <View style={styles.DoorScreen}>
            <View style={styles.doorItem}>
                <Image
                    source = {{uri: item.url}}
                    style={styles.doorImage}>
                </Image>

                <View style={styles.doorText}>
                    <Text style={styles.doorName}>{item.name}</Text>
                    <Text style={styles.doorState}>{item.humidity}</Text>
                </View>
            </View>
        </View>
    )

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.listRooms}
                    renderItem={this.humidityItem}
                />
            </View>
        )
    }
}





function HumidityScreen({route}) {
    return (
        <HumidityList/>
    );
}

export default HumidityScreen;