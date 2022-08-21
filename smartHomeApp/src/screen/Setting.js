import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, Alert } from "react-native";
import { createStackNavigator} from '@react-navigation/stack'
import DetailsScreen from './Details'
import styles from '../style/screen'
import { AuthContext } from '../api/context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const SettingsScreen = ({navigation}) => {
    const {signOut} = React.useContext(AuthContext);
    const createButtonSignOut = () => {
        Alert.alert(
            "Notification",
            "Do you want to sign out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Sign out",
                    onPress: ()=> signOut()
                }
            ]
        );   
    }

    return (
        <View style ={styles.container}>
            <View style={styles.containerSetting}>
                <View style={styles.headerSetting}>
                    <View style={styles.avatarView}>
                        <Image
                            source = {{uri:"https://scontent.fvca1-1.fna.fbcdn.net/v/t1.6435-9/150974013_1573054362881977_6094937518718906392_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=O9MmdkVWgQ4AX9fmLe-&_nc_ht=scontent.fvca1-1.fna&oh=f55edd77fb680667dd733b1542e3f9da&oe=60C212C3"}} 
                            style = {styles.avatarImage}>
                        </Image>
                        <TouchableOpacity style={styles.avatarBtn}>
                            <MaterialCommunityIcons name="camera" size={30} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.useNameText}>Triệu Tấn Hùng</Text>
                </View>
                <TouchableOpacity style={styles.editSettingBtn}>
                            <MaterialCommunityIcons name="account-edit-outline" size={30} />
                            <Text style={styles.settingBtnText}>Edit Profile</Text>
                </TouchableOpacity>
                <View style = {styles.lineSetting}></View>
                <View style = {styles.bodySetting}>
                    <TouchableOpacity style={styles.bodySettingBtnView}>
                                <MaterialIcons name="family-restroom" size={30} />
                                <Text style={styles.settingBtnText}>Family Members</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bodySettingBtnView}>
                                <MaterialIcons name="contact-support" size={30} />
                                <Text style={styles.settingBtnText}>Support Center</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bodySettingBtnView}>
                                <MaterialCommunityIcons name="security" size={30} />
                                <Text style={styles.settingBtnText}>Security & Other</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signoutSettingBtn} onPress={createButtonSignOut}>
                                <Text style={styles.signoutSettingText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>           
            </View>
        </View>
    );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerTitleAlign: 'center',
                }}
            />
            <SettingsStack.Screen name="Details" component={DetailsScreen}/>
        </SettingsStack.Navigator>
    )
}

export default SettingsStackScreen;
    