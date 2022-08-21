import React, {Component} from 'react';
import { View, Text, Button, FlatList, Image, Touchable, TouchableOpacity } from "react-native";
import { createStackNavigator} from '@react-navigation/stack'
import styles from '../style/screen'
import RoomsData from '../data/RoomsData';
import RoomDetail from './RoomDetail';
import DetailsScreen from './Details';
import Door from './Door';
import Light from './Light';
class FlatListItem extends Component {
    render(){
        return(
            <View style={styles.roomScreenItem}>
                <TouchableOpacity style={styles.roomSceenBtn} onPress= {() => this.props.navigation.navigate('RoomDetail', {name: this.props.item.name, id: this.props.item.key})}>
                    <Image
                        source = {{uri: this.props.item.url}}
                        style={styles.roomSceenBtnImage}>
                    </Image>

                    <View style={styles.roomSceenBtnText}>
                        <Text style={styles.roomSceenBtnName}>{this.props.item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>          
        )
    }
};

function RoomsScreen({navigation}) {
    return (
        <View style = {styles.container}>
            <View style = {styles}>
                <FlatList data={RoomsData}
                renderItem={({item, index})=>{
                    // console.log(`Item = ${item}, index = ${index}`);
                    return(
                        
                        <FlatListItem item={item} index={index} navigation={navigation}>
                        </FlatListItem>
                    );
                }}>

                </FlatList>
            </View>
        </View>
    );
}

const RoomsStack = createStackNavigator();

function RoomsStackScreen() {
    return (
        <RoomsStack.Navigator
        >
            <RoomsStack.Screen
                name="Rooms"
                component={RoomsScreen}
                options={{
                    headerTitleAlign: 'center',
                }}
            />
            <RoomsStack.Screen
                name="RoomDetail"
                component={RoomDetail}
                options={({route}) => ({title: route.params.name})}
                options={{
                    headerShown: false
                }}
            />

        </RoomsStack.Navigator>
    )
}

export default RoomsStackScreen;
    