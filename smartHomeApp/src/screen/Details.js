import React from 'react';
import { View, Text} from "react-native";
import styles from '../style/screen'

function DetailsScreen({route}) {
    const {name, id} = route.params;
    return (
        <View style={styles.content}>
            <Text>{name}</Text>
        </View>
    )
}

export default DetailsScreen;