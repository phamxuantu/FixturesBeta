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

const styles = require('../../styles/RegisterStyle');


export default class RegisterScreen extends Component {

    static navigationOptions = () => ({
        headerStyle: { position: 'absolute' }
    });

    constructor(props) {
        super(props);
        this.state = { 
            fullname: '',
            username: '', 
            password: '',  
            rePass: '',
            email: '',
            phone: ''
        };
    }


    register(name, username, password, rePass, email, phone) {
        if (
            (name === '') && 
            (username === '') && 
            (password === '') && 
            (rePass === '') && 
            (email === '') && 
            (phone === '')
        ) {
            this.refs.toast.show('You must complete all the fields', DURATION.LENGTH_LONG);
        } else if (name === '') {
            this.refs.toast.show('Please enter full name', DURATION.LENGTH_LONG);
        } else if (username === '') {
            this.refs.toast.show('Please enter username', DURATION.LENGTH_LONG);
        } else if (password === '') {
            this.refs.toast.show('Please enter password', DURATION.LENGTH_LONG);
        } else if (rePass === '') {
            this.refs.toast.show('Please retype password', DURATION.LENGTH_LONG);
        } else if (rePass !== password) {
            this.refs.toast.show('Retype password not match', DURATION.LENGTH_LONG);
        } else if (email === '') {
            this.refs.toast.show('Please enter email', DURATION.LENGTH_LONG);
        } else if (phone === '') {
            this.refs.toast.show('Please enter phone', DURATION.LENGTH_LONG);
        } else {
            fetch(
                'http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/Controllers/register.php',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password,
                        name,
                        email,
                        phone
                    })
                }
            )
                .then(response => response.json())
                .then(responseJson => {
                    //ToastAndroid.show(responseJson.password, ToastAndroid.LONG);
                    if (responseJson.notify === 'success') {
                        this.refs.toast.show('Register success', DURATION.LENGTH_LONG);
                        // console.log('test info', responseJson.info);
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
                            this.props.navigation.goBack();
                        }}
                    >
                        <FontAwesome name="arrow-left" size={25} style={styles.btnMenu} />
                    </TouchableOpacity>
                </View>
                <View style={styles.formLogin}>
                    <ScrollView>
                        <View style={styles.logoLogin}>
                            <Image source={logoLogin} style={styles.loginImg} />
                        </View>
                        {/*full name*/}
                        <FontAwesome
                            name="user-o"
                            style={
                                Platform.OS === 'ios' ?
                                    styles.iconIOS :
                                    styles.icon
                            }
                        />
                        <TextInput
                            onChangeText={fullname => this.setState({
                                fullname
                            })}
                            placeholder="Full name:"
                            placeholderTextColor="#fff"
                            style={
                                Platform.OS === 'ios' ?
                                    styles.txtusernameIOS :
                                    styles.txtusername
                            }
                            underlineColorAndroid='#fff'
                        />
                        {/*username name*/}
                        <FontAwesome
                            name="user-o"
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
                        {/*pass*/}
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
                        {/*re-pass*/}
                        <FontAwesome
                            name="lock"
                            style={
                                Platform.OS === 'ios' ?
                                    styles.iconIOS : styles.icon
                            }
                        />
                        <TextInput
                            onChangeText={rePass => this.setState({
                                rePass
                            })}
                            placeholder="Re-Password:"
                            secureTextEntry
                            placeholderTextColor="#fff"
                            style={
                                Platform.OS === 'ios' ?
                                    styles.txtpasswordIOS :
                                    styles.txtpassword
                            }
                            underlineColorAndroid="#fff"
                        />
                        {/*email*/}
                        <FontAwesome
                            name="envelope-o"
                            style={
                                Platform.OS === 'ios' ?
                                    styles.iconIOS :
                                    styles.icon
                            }
                        />
                        <TextInput
                            onChangeText={email => this.setState({
                                email
                            })}
                            placeholder="Email:"
                            keyboardType='email-address'
                            autoCapitalize='none'
                            placeholderTextColor="#fff"
                            style={
                                Platform.OS === 'ios' ?
                                    styles.txtusernameIOS :
                                    styles.txtusername
                            }
                            underlineColorAndroid='#fff'
                        />
                        {/*phone*/}
                        <FontAwesome
                            name="phone"
                            style={
                                Platform.OS === 'ios' ?
                                    styles.iconIOS :
                                    styles.icon
                            }
                        />
                        <TextInput
                            onChangeText={phone => this.setState({
                                phone
                            })}
                            placeholder="Phone:"
                            keyboardType='numeric'
                            placeholderTextColor="#fff"
                            style={
                                Platform.OS === 'ios' ?
                                    styles.txtPhoneIOS :
                                    styles.txtPhone
                            }
                            underlineColorAndroid='#fff'
                        />

                        <TouchableOpacity
                            onPress={() => {
                                this.register(this.state.fullname,
                                    this.state.username,
                                    this.state.password,
                                    this.state.rePass,
                                    this.state.email,
                                    this.state.phone
                                );
                            }}
                        >
                            <View 
                                style={
                                    Platform.OS === 'ios' ? 
                                    styles.buttonLoginIOS : 
                                    styles.buttonLogin
                                }
                            >
                                <Text style={styles.textButton}>Register</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <Toast ref='toast' />
            </View>
        );
    }
}
