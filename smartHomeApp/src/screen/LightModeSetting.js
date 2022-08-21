import React from 'react';
import { View, Text, TouchableOpacity} from "react-native";
import styles from '../style/screen'
import DateTimePicker from "react-native-modal-datetime-picker";
import { Component } from 'react';
import moment from 'moment';

class DateTime extends Component{
    constructor(){
        super()
        this.state = {
            isVisible: false,
            chosenDate: moment(new Date().toLocaleString()).format('MMM-DD-YYYY HH:mm'),
            date: moment(new Date().toLocaleString()).format('MMM-DD-YYYY'),
            time: moment(new Date().toLocaleString()).format('HH:mm')
        }
    }

    handlePicker =  (datetime) => {
        this.setState({
            isVisible : false,
            chosenDate: moment(datetime).format('MMM-DD-YYYY HH:mm'),
            date: moment(datetime).format('MMM-DD-YYYY'),
            time: moment(datetime).format('HH:mm')
        })
    }

    showPicker =  () => {
        this.setState({
            isVisible : true,
        })
    }

    hidePicker =  () => {
        this.setState({
            isVisible : false
        })
    }

    render(){
        return (
            <View>
                <View style={styles.dateRow}>
                    <Text style={styles.titleRow}>Time:</Text>
                    <Text style={styles.dateLightMode}>{this.state.date}</Text>
                </View>
                
                <View style={styles.timeRow}>
                    <Text style={styles.timeLightMode}>
                        {this.state.time}
                    </Text>
                </View>
                
                <View>
                    <TouchableOpacity onPress = {this.showPicker}>
                        <View style={styles.settimeButton}>
                            <Text>Set Time</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                <DateTimePicker
                    isVisible={this.state.isVisible}
                    onConfirm={this.handlePicker}
                    onCancel={this.hidePicker}
                    mode = {'datetime'}
                    is24Hour = {true}
                />

                
            </View>
        );
    }
}

function LightModeSetting({route, navigation}) {
    const {item} = route.params;
    return (
        <View style={styles.containerLightMode}>
            <View style={styles.rowLightMode}>
                <Text style={styles.titleRow}>Name:</Text>
                <Text style={styles.nameMode}>{item.name}</Text>
            </View>
            <View style={styles.dividingLine}></View>
            <View style={styles.rowLightMode}>
                <Text style={styles.titleRow}>Status:</Text>
                <Text style={item.state == "1" ? styles.stateModeOn : styles.stateModeOff}>{item.state == "1" ? "On" : "Off"}</Text>
            </View>
            <View style={styles.dividingLine}></View>
            
            <View>
                <DateTime></DateTime>
            </View>
            <View style={styles.dividingLine}></View>
            <View style={styles.buttonRow}>
                <TouchableOpacity style ={styles.lightModeButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelLightModeText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style ={styles.lightModeButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.saveLightModeText}>Save</Text>
                </TouchableOpacity>
            </View>
        
        </View>
    )
}

export default LightModeSetting;