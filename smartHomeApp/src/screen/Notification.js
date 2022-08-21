import React, {Component} from 'react';
import {ScrollView, View, Text, FlatList, TouchableOpacity } from "react-native";
import { createStackNavigator} from '@react-navigation/stack'
import DetailsScreen from './Details'
import styles from '../style/screen';
import NotificationData from '../data/NotificationData';

class FlatListNotification extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.notificationCard} onPress={()=> this.props.navigation.navigate("Details", {name: "Notification"})}>
                    <View style={styles.titleNoti}>
                        <Text style={this.props.item.type == "Warning" ? styles.warningNoti : (this.props.item.type == "Setting" ? styles.settingNoti : styles.alertNoti)}>{this.props.item.type}</Text>
                        <Text style={styles.timeNoti}>{this.props.item.time}</Text>
                    </View>                  
                    <Text style={this.props.item.checked == "1"? styles.contentNotiChecked : styles.contentNotiUnChecked}>{this.props.item.content}</Text>
                </TouchableOpacity>
            </View>
        ); 
    }
}

function NotificationsScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.containerNoti}>
                <FlatList data={NotificationData}
                renderItem={({item, index})=>{
                    // console.log(`Item = ${item}, index = ${index}`);
                    return(
                        
                        <FlatListNotification item={item} index={index} navigation={navigation}>
                        </FlatListNotification>
                    );
                }}>

                </FlatList>
            </View>
        </View>
    );
}

const NotificationsStack = createStackNavigator();

function NotificationsStackScreen() {
    return (
        <NotificationsStack.Navigator>
            <NotificationsStack.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{
                    headerTitleAlign: 'center',
                }}
            />
            <NotificationsStack.Screen name="Details" component={DetailsScreen}/>
        </NotificationsStack.Navigator>
    )
}

export default NotificationsStackScreen;
    