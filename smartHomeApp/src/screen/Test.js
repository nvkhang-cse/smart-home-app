import React from 'react';
import {Button, View, TouchableOpacity, Text} from 'react-native';
import styles from '../style/screen';

const turn_on = {
    id: "1",
    name: "LED",
    data: "1",
    unit: ""
}

const turn_off = {
    id: "1",
    name: "LED",
    data: "0",
    unit: ""
}

const publishFeedLight = (message) => {
    fetch('http://192.168.43.85:3000/light', { // Add your IP address here
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(message)
    })
    .then((response)=>response.json().then(data => alert(data.status)))
    .catch((error) =>{
        console.error(error);
    });
}

const subscribeFeedGas = () => {
    fetch('http://192.168.43.85:3000/gas', { // Add your IP address here
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then((response)=>response.json().then(data => alert(data.status)))
    .catch((error) =>{
        console.error(error);
    });
}

function Test({navigation}){
    return (
        <View style={styles.containerSignIn}>
            <TouchableOpacity style ={styles.signinBtn} onPress= {async() => publishFeedLight(turn_on)}>
                <Text style={styles.signinText}>Turn On</Text>
            </TouchableOpacity>

            <TouchableOpacity style ={styles.signinBtn} onPress= {async() => publishFeedLight(turn_off)}>
                <Text style={styles.signinText}>Turn Off</Text>
            </TouchableOpacity>

            <TouchableOpacity style ={styles.signinBtn} onPress= {async() => subscribeFeedGas(turn_off)}>
                <Text style={styles.signinText}>GAS</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Test;