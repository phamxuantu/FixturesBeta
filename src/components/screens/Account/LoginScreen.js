import React, { Component } from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Platform
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import backgroundLogin from '../../../images/background-login.png';
import logoLogin from '../../../images/logo.png';

const styles = require('../../styles/LoginStyle');


export default class ChatScreen extends Component {

  static navigationOptions = () => ({
    headerStyle: { position: 'absolute' }
  });

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }


  login(username, password) {
    if ((username === '') && (password === '')) {
      ToastAndroid.show('Please enter username and password', ToastAndroid.LONG);
    } else if (username === '') {
        ToastAndroid.show('Please enter username', ToastAndroid.LONG);
      } else if (password === '') {
          ToastAndroid.show('Please enter password', ToastAndroid.LONG);
        } else {
          fetch(
            'http://demo.tntechs.com.vn/xuantu/demo/Fixtures-Test/Controllers/login.php',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username,
                password
              })
            }
          )
            .then(response => response.json())
            .then(responseJson => {
              //ToastAndroid.show(responseJson.password, ToastAndroid.LONG);
              if (responseJson.notify === 'success') {
                ToastAndroid.show('Login success', ToastAndroid.LONG);
                this.props.navigation.navigate('Fixtures');
              } else {
                ToastAndroid.show('Login failure', ToastAndroid.LONG);
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
  }

  render() {
    return (<View style={styles.container}>
            <View style={Platform.OS === 'ios' ? styles.contentIOS : styles.content}>
              <Image source={backgroundLogin} style={styles.background} />
            </View>
            <View style={styles.bgMenuButton}>
              <TouchableOpacity 
                onPress={() => {
                  this.props.navigation.navigate('DrawerOpen');
                }}
              >
                <FontAwesome name="bars" size={30} style={styles.btnMenu} />
              </TouchableOpacity>
            </View>
            <View style={styles.formLogin}>
              <ScrollView>
                <View style={styles.logoLogin}>
                  <Image source={logoLogin} style={styles.loginImg} />
                </View>
                <FontAwesome 
                  name="envelope-o" 
                  style={
                    Platform.OS === 'ios' ? 
                    styles.iconIOS : 
                    styles.icon
                  } 
                />
                <TextInput 
                  onChangeText={username => this.setState({
                    username
                  })} 
                  placeholder="Email or Username:" 
                  placeholderTextColor="#fff" 
                  style={
                    Platform.OS === 'ios' ? 
                    styles.txtusernameIOS : 
                    styles.txtusername
                  } 
                  underlineColorAndroid='#fff'
                />
                <FontAwesome 
                  name="lock" 
                  style={
                    Platform.OS === 'ios' ? 
                    styles.iconIOS : styles.icon
                  } 
                />
                <TextInput 
                  onChangeText={password => this.setState({
                    password
                  })} 
                  placeholder="Password:" 
                  secureTextEntry
                  placeholderTextColor="#fff" 
                  style={
                    Platform.OS === 'ios' ? 
                    styles.txtpasswordIOS : 
                    styles.txtpassword
                  } 
                  underlineColorAndroid="#fff" 
                />

                <View style={Platform.OS === 'ios' ? styles.buttonLoginIOS : styles.buttonLogin}>
                <TouchableOpacity 
                  onPress={() => { this.login(this.state.username, this.state.password); }}
                >
                    <Text style={styles.textButton}>Login</Text>
                </TouchableOpacity>
                </View>

                <Text style={styles.txtOtherLogin}>or Login with:</Text>
                <View style={styles.iconSocial}>
                  <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 10 }}>
                    <TouchableOpacity onPress={() => {}}>
                      <View 
                      style={
                        Platform.OS === 'ios' ? 
                        styles.iconFacebookIOS : 
                        styles.iconFacebook}
                      >
                        <FontAwesome 
                          name="facebook" 
                          size={30} 
                          color="#fff" 
                          style={{ textAlign: 'center', backgroundColor: 'transparent' }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flex: 1, paddingLeft: 10 }}>
                    <TouchableOpacity onPress={() => {}}>
                      <View 
                        style={
                          Platform.OS === 'ios' ? 
                          styles.iconGoogleIOS : 
                          styles.iconGoogle
                        }
                      >
                        <FontAwesome 
                          name="google" 
                          size={30} 
                          color="#fff" 
                          style={{ 
                            textAlign: 'center', 
                            alignItems: 'center', 
                            backgroundColor: 'transparent' 
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>);
  }
}
