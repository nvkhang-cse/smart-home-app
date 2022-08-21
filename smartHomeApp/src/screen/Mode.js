import React from 'react';
import _ from "lodash";
import { View, Text, TouchableOpacity, ScrollView, Switch } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from "react-native-picker-select";
import { createStackNavigator} from '@react-navigation/stack'
import styles from '../style/screen'
import RoomsData from '../data/RoomsData'
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Component } from 'react';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import LightData from '../data/LightData';

function convertToDisplay(data){
    var res = []
    res.push({
        label: "All room",
        value: "0",
    });
    data.forEach(item => {
        res.push({
            label: item.name,
            value: item.key,
        })
    });

    return res;
}

function filter(data, id) {
    if(id==0) return data;
    return data.filter(item => item.room === id);
}


class ActivatedAt extends Component{
    constructor(){
        super()
        this.state = {
            isVisible: false,
            chosenDate: moment(new Date().toLocaleString()).format('MMM-DD-YYYY HH:mm'),
        }
    }

    handlePicker =  (datetime) => {
        this.setState({
            isVisible : false,
            chosenDate: moment(datetime).format('MMM-DD-YYYY HH:mm'),
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
                <View>
                    <TouchableOpacity onPress = {this.showPicker}>
                        <View style={styles.timeButtonMode}>
                            <Text>
                                {this.state.chosenDate}
                            </Text>
                            <MaterialCommunityIcons name="clock-outline" size={30} />
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

class DeactivatedAt extends Component{
    constructor(){
        super()
        this.state = {
            isVisible: false,
            chosenDate: moment(new Date().toLocaleString()).format('MMM-DD-YYYY HH:mm'),
        }
    }

    handlePicker =  (datetime) => {
        this.setState({
            isVisible : false,
            chosenDate: moment(datetime).format('MMM-DD-YYYY HH:mm'),
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
                <View>
                    <TouchableOpacity onPress = {this.showPicker}>
                        <View style={styles.timeButtonMode}>
                            <Text>
                                {this.state.chosenDate}
                            </Text>
                            <MaterialCommunityIcons name="clock-outline" size={30} />
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

// class LightItemList extends Component{
//     constructor({itemChoose}) {
//         super();
//         this.state = {
//             listLights : filter(LightData, itemChoose)
//         }
//     }


//     setLightState = (value, index) => {
//         const tempData = _.cloneDeep(this.state.listLights);
//         tempData[index].state = value ? "1" : "0";
//         this.setState({listLights: tempData});
//     }

//     LightItem = ({item,index}) => (
//         <View style={styles.lightCard}>
//             <View style={styles.lightItem}>
//                 <View style={styles.headerLightItem}>
//                     <Text style={styles.nameLight}>{item.name}</Text>
//                     <Switch
//                         value={item.state == "1" ? true : false}
//                         style={styles.toggleLight}
//                         onValueChange={(value) => this.setLightState(value,index)}
//                     />
//                 </View>
//                 <View style={styles.bodyLightItem}>
//                     <MaterialCommunityIcons style={item.state == "1"?styles.lightOn:styles.lightOff} name={item.state == "1"?'lightbulb-on':'lightbulb-off'} size={50} color={"#000000"} />
//                 </View>
//             </View>
//         </View>
//     )
//     render() {
//         return (
//             <View style={styles.lightSystemMode}>
//                 <ScrollView>
//                     <FlatList
//                         data ={this.state.listLights}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         renderItem={this.LightItem}>
//                     </FlatList>
//                 </ScrollView>
//             </View>
//         )
//     }
// }

function Mode({route, navigation}) {

    const [itemChoose, setItemChoose] = React.useState("0");

    const [listLight, setListLight] = React.useState(filter(LightData,itemChoose));

    const setLightState = (value, index) => {
        const tempData = _.cloneDeep(listLight);
        tempData[index].state = value ? "1" : "0";
        setListLight(tempData);
    }

    const LightItem = ({item,index}) => (
        <View style={styles.lightCard}>
            <View style={styles.lightItem}>
                <View style={styles.headerLightItem}>
                    <Text style={styles.nameLight}>{item.name}</Text>
                    <Switch
                        value={item.state == "1" ? true : false}
                        style={styles.toggleLight}
                        onValueChange={(value) => setLightState(value,index)}
                    />
                </View>
                <View style={styles.bodyLightItem}>
                    <MaterialCommunityIcons style={item.state == "1"?styles.lightOn:styles.lightOff} name={item.state == "1"?'lightbulb-on':'lightbulb-off'} size={50} color={"#000000"} />
                </View>
            </View>
        </View>
    )



    return (
        <View style={styles.containerMode}>
            <View style={styles.rowLightMode}>
                <Text style={styles.titleRow}>Name:</Text>
                <TextInput
                    style={styles.nameMode}
                    placeholder="Name Mode"
                />
            </View>
            
            <View style={styles.dividingLine}></View>
            
            <View style={styles.rowMode}>
                <Text style={styles.titleRow}>Room:</Text>
                <View style={styles.selectRoomMode}>
                    <RNPickerSelect
                        value = {itemChoose}
                        onValueChange={(value) =>{
                            setItemChoose(value);
                            setListLight(filter(LightData, itemChoose));
                        }}
                        items={convertToDisplay(RoomsData)}
                        pickerProps={{style: styles.pickerProps}}
                    />
                </View>
            </View>

            <View style={styles.dividingLine}></View>

            <View style={styles.rowMode}>
                <Text style={styles.titleRow}>Activated at:</Text>
                <View>
                    <ActivatedAt></ActivatedAt>
                </View>
            </View>

            <View style={styles.dividingLine}></View>

            <View style={styles.rowMode}>
                <Text style={styles.titleRow}>Deactivated at:</Text>
                <View>
                    <DeactivatedAt></DeactivatedAt>
                </View>
            </View>

            <View style={styles.dividingLine}></View>
            
            <View>
                <View style={styles.rowLightMode}>
                    <Text style={styles.titleRow}>Light system:</Text>
                </View>
                
                <View style={styles.lightSystemMode}>
                    <ScrollView>
                        <FlatList
                            data ={listLight}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item,index}) => (
                                <LightItem item={item} index={index}/>
                            )}>
                        </FlatList>
                    </ScrollView>
                </View>


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

export default Mode;