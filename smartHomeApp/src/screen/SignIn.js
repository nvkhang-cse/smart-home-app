import React from 'react';
import { Text, View, TextInput, Button , TouchableOpacity, Image} from 'react-native';

import { AuthContext } from '../api/context';
import styles from '../style/screen';


function SignIn({navigation}) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const {signIn} = React.useContext(AuthContext);
  
    return (
      <View style={styles.containerSignIn}>
        <View style={styles.logo}>
          <Image
              style={styles.logo}
              source={require('../img/logo.jpg')}>
          </Image>
        </View>
        
        <Text style={styles.title}>Smart Home App</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        
        <View style={styles.forgetView}>
          <TouchableOpacity>
            <Text style={styles.forgetBtn}>Forget your password ?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style ={styles.signinBtn} onPress= {() => signIn({username, password})}>
          <Text style={styles.signinText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress= {() => navigation.navigate('SignUp')}>
          <Text style={styles.signupText}>Do you have an accout? Create one?</Text>
        </TouchableOpacity>
      </View>
    )
  }

export default SignIn;