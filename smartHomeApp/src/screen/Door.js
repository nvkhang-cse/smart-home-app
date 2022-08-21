import React, {Component} from 'react';
import _ from "lodash";
import { View, Text, Switch, FlatList, TouchableOpacity, Image} from "react-native";
import styles from '../style/screen'
import DoorData from '../data/DoorData';
import getData from '../data/getData';

function filter(data, id) {
    if(id === "0")
        return data;
    return data.filter(item => item.room === id);
}

var data = [];

class DoorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoors : data,
            id: props.id
        } 
    }

    async loadData(){
        getData("door").then((res) => {
            res = filter(res, this.state.id);
            if (res != this.state.listDoors){
                this.setState({listDoors: res});
            }
        });
    };

    async componentDidMount(){
        this.loadData();
        setInterval(() => {
            this.loadData();
        }, 2000);
    }

    doorItem = ({item, index}) => (
        <View style={styles.DoorScreen}>
            <View style={styles.doorItem}>
                <Image
                    source = {{uri: item.url}}
                    style={styles.doorImage}>
                </Image>

                <View style={styles.doorText}>
                    <Text style={styles.doorName}>{item.name}</Text>
                    <Text style={styles.doorState}>{item.state === "1" ? "Locked" : "Not Locked"}</Text>
                </View>
            </View>
        </View>
    )

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.listDoors}
                    renderItem={this.doorItem}
                />
            </View>
        )
    }
}

function DoorScreen({route}) {
    const id = route.params.id;
    return (
        <DoorList id={id}/>
    );
}

export default DoorScreen;