import React, {Component} from 'react';
import {ScrollView, View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import RNPickerSelect from "react-native-picker-select";
import { createStackNavigator} from '@react-navigation/stack'
import styles from '../style/screen';
import LightModeData from '../data/LightModeData';
import Mode from './Mode';
import LightModeSetting from './LightModeSetting';


function convertToDisplay(data){
    var res = []
    data.forEach(item => {
        res.push({
            label: item.name,
            value: item.key,
        })
    });
    return res;
}


class LighModeItem extends Component {

    createButtonDeleteMode = () =>
        Alert.alert(
            "Notification",
            "Do you want to delete " + this.props.item.name + " ?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Remove",
                    onPress: ()=> {console.log("Removed " + this.props.item.key)}
                }
            ]
        );   

    render() {
        return (
            <View style={this.props.item.key ==this.props.itemChoose ? styles.modeViewChoose : styles.modeView}>
                <TouchableOpacity style={styles.editModeButton} onPress={() => this.props.navigation.navigate("Light Mode Setting", {item: this.props.item})}>
                    <Ionicons name="create-outline" size={24}/>
                </TouchableOpacity>
                <Text style={styles.nameMode}>{this.props.item.name}</Text>
                <TouchableOpacity style={styles.deleteModeButton} onPress={this.createButtonDeleteMode}>
                    <Ionicons name="trash-outline" size={24}/>
                </TouchableOpacity>
            </View>
        ); 
    }
}

function LightModesScreen({navigation}) {

    const [itemChoose, setItemChoose] = React.useState("1");
    

    return (
        <View style={styles.container}>
            <View style={styles.headerLightMode}>
                <View style={styles.textHeaderLightMode}>
                    <Text>Choose mode:</Text>
                </View>
                <View style={styles.selectHeaderLightMode}>
                    <RNPickerSelect
                        value={itemChoose}
                        onValueChange={(value) => {
                            setItemChoose(value);
                        }}
                        items={convertToDisplay(LightModeData)}
                        pickerProps={{style: styles.pickerProps}}
                    />
                </View>
                <View style={styles.saveHeaderLightMode}>
                    <TouchableOpacity style={styles.saveButton} onPress={() => console.log("Saved!")}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>             
            </View>
            
            <View style={styles.modeList}>
                <FlatList data={LightModeData}
                    renderItem={({item, index})=>{
                        // console.log(`Item = ${item}, index = ${index}`);
                        return(
                            
                            <LighModeItem item={item} index={index} itemChoose={itemChoose} navigation={navigation}>
                            </LighModeItem>
                        );
                    }}>
                </FlatList>
            </View>
            <View style={styles.footerLightMode}>
                <View style={styles.dividingLine}></View>
                <View style={styles.createModeButtonContainer}>
                    <TouchableOpacity style={styles.createModeButton} onPress={() => navigation.navigate("Mode")}>
                        <Text>Create new mode </Text>
                        <Ionicons name="add-circle-outline" size={24}/>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    );
}

const LightModesStack = createStackNavigator();

function LightModeStackScreen() {
    return (
        <LightModesStack.Navigator>
            <LightModesStack.Screen
                name="Light Mode"
                component={LightModesScreen}
                options={{
                    headerTitleAlign: 'center',
                }}
            />
            <LightModesStack.Screen name="Mode" component={Mode}/>
            <LightModesStack.Screen name="Light Mode Setting" component={LightModeSetting}/>
        </LightModesStack.Navigator>
    )
}

export default LightModeStackScreen;
    