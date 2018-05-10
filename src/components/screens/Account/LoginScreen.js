import React, { Component } from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  AsyncStorage
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import backgroundLogin from '../../../images/background-login.png';
import logoLogin from '../../../images/logo.png';

const styles = require('../../styles/LoginStyle');


export default class LoginScreen extends Component {

  static navigationOptions = () => ({
    headerStyle: { position: 'absolute' }
  });

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }


  login(username, password) {
    if ((username === '') && (password === '')) {
      // console.log('check toast', 'rong ca hai');
      this.refs.toast.show('Please enter username and password', DURATION.LENGTH_LONG);
    } else if (username === '') {
      this.refs.toast.show('Please enter username', DURATION.LENGTH_LONG);
    } else if (password === '') {
      this.refs.toast.show('Please enter password', DURATION.LENGTH_LONG);
    } else {
      fetch(
        'http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/Controllers/login.php',
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
            this.refs.toast.show('Login success', DURATION.LENGTH_LONG);
            AsyncStorage.setItem('userInfo', JSON.stringify(responseJson.info));
            this.props.navigation.navigate('Screen_InfoUser', {
              dataUser: JSON.stringify(responseJson.info)
            });
          } else {
            this.refs.toast.show(responseJson.notify, DURATION.LENGTH_LONG);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
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
              placeholder="Username:" 
              autoCapitalize='none'
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

            <TouchableOpacity
              onPress={() => { 
                this.login(this.state.username, this.state.password); 
              }}
            >
              <View style={Platform.OS === 'ios' ? styles.buttonLoginIOS : styles.buttonLogin}>
                  <Text style={styles.textButton}>Login</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.txtOtherLogin}>OR</Text>

            <TouchableOpacity
              onPress={() => { this.props.navigation.navigate('Screen_Register'); }}
            >
              <View style={Platform.OS === 'ios' ? styles.buttonLoginIOS : styles.buttonLogin}>
                  <Text style={styles.textButton}>Register</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {
                this.props.navigation.navigate('Screen_ForgotPass');
              }}
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <Toast ref='toast' />
      </View>
    );
  }
}
