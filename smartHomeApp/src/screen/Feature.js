import React from 'react';
import { View, Text, Button, Touchable, TouchableOpacity } from "react-native";
import { createStackNavigator} from '@react-navigation/stack'
import styles from '../style/screen'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Door from './Door';
import Light from './Light';
import Temperature from './Temperature';
import Gas from './Gas';
import Humidity from './Humidity';
import Window from './Window';

function FeaturesScreen({navigation}) {
    return (
        <View style = {styles.container}>
            <View style={styles.containerFeature}>
                <View style={styles.featureRow}>
                    <TouchableOpacity style={styles.ViewBtnLeft} onPress={()=> navigation.navigate("Door", {name: " General", id: "0"})}>
                        <FontAwesome5Pro name={'door-open'} size={30} />
                        <Text>Door</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ViewBtnRight} onPress={()=> navigation.navigate("Window", {name: " General", id: "0"})}>
                        <MaterialCommunityIcons name="window-closed-variant" size={30} />
                        <Text>Window</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.featureRow}>
                    <TouchableOpacity style={styles.ViewBtnLeft} onPress={()=> navigation.navigate("Temperature", {name: " General", id: "0"})}>
                        <FontAwesome5Pro name={'temperature-low'} size={30} />
                        <Text>Temperature</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ViewBtnRight} onPress={()=> navigation.navigate("Light", {name: " General", id: "0"})}>
                        <MaterialCommunityIcons name="lightbulb-on" size={30} />
                        <Text>Light</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.featureRow}>
                    <TouchableOpacity style={styles.ViewBtnLeft} onPress={()=> navigation.navigate("Gas", {name: " General", id: "0"})}>
                        <MaterialCommunityIcons name="gas-cylinder" size={30} />
                        <Text>Gas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ViewBtnRight} onPress={()=> navigation.navigate("Humidity", {name: " General", id: "0"})}>
                        <MaterialCommunityIcons name="water-percent" size={30} />
                        <Text>Humidity</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const FeaturesStack = createStackNavigator();

function FeaturesStackScreen() {
    return (
        <FeaturesStack.Navigator>
            <FeaturesStack.Screen name="Features" component={FeaturesScreen}/>
            <FeaturesStack.Screen name="Door" component={Door}/>
            <FeaturesStack.Screen name="Light" component={Light}/>
            <FeaturesStack.Screen name="Gas" component={Gas}/>
            <FeaturesStack.Screen name="Temperature" component={Temperature}/>
            <FeaturesStack.Screen name="Humidity" component={Humidity}/>
            <FeaturesStack.Screen name="Window" component={Window}/>
        </FeaturesStack.Navigator>
    )
}

export default FeaturesStackScreen;
    