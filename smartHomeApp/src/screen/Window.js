import React, {Component} from 'react';
import _ from "lodash";
import { View, Text, Switch, FlatList, TouchableOpacity, Image} from "react-native";
import styles from '../style/screen'
import RoomsData from '../data/RoomsData';

var data = [];

class WindowList extends Component {
    constructor() {
        super();
        this.state = {
            listRooms : data
        } 
    }

    windowItem = ({item, index}) => (
        <Text>Window Item</Text>
    )

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.listRooms}
                    renderItem={this.windowItem}
                />
            </View>
        )
    }
}





function WindowScreen({route}) {
    data = RoomsData;
    return (
        <WindowList/>
    );
}

export default WindowScreen;