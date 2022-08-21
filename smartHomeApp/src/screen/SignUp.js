import React from 'react';
import { Text, View, TextInput, Button , TouchableOpacity, Image} from 'react-native';

import { AuthContext } from '../api/context';
import styles from '../style/screen';

function SignUp({navigation}) { 

    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repassword, setRepassword] = React.useState('');
    
    const {signUp} = React.useContext(AuthContext);

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
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

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

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm password"
            value={repassword}
            onChangeText={setRepassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style ={styles.signinBtn} onPress= {() => signUp({email, username, password, repassword})}>
          <Text style={styles.signinText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress= {() => navigation.navigate('SignIn')}>
          <Text style={styles.signupText}>Do you have an accout? Sign in</Text>
        </TouchableOpacity>
      </View>
    )
  }

export default SignUp;