import React, { Component } from 'react';
import {
    View,
    Image,
    TextInput,
    Text,
    ScrollView,
    TouchableOpacity,
    Platform
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import backgroundLogin from '../../../images/background-login.png';
import logoLogin from '../../../images/logo.png';

const styles = require('../../styles/CreatePassStyle');


export default class CreatePassScreen extends Component {

    static navigationOptions = () => ({
        headerStyle: { position: 'absolute' }
    });

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            rePass: ''
        };
    }


    createNewPass(password, rePass) {
        if (password === '') {
            this.refs.toast.show('Please enter password', DURATION.LENGTH_LONG);
        } else if (rePass === '') {
            this.refs.toast.show('Please retype password', DURATION.LENGTH_LONG);
        } else if (rePass !== password) {
            this.refs.toast.show('Retype password not match', DURATION.LENGTH_LONG);
        } else {
            fetch(
                'http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/Controllers/CreateNewPass.php',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.props.navigation.state.params.email,
                        password
                    })
                }
            )
                .then(response => response.json())
                .then(responseJson => {
                    //ToastAndroid.show(responseJson.password, ToastAndroid.LONG);
                    if (responseJson.notify === 'success') {
                        this.refs.toast.show('Change password successful', DURATION.LENGTH_LONG);
                        this.props.navigation.navigate('Screen_Login');
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

                        <Text style={styles.txtOtherLogin}>
                            Enter new password
                        </Text>

                        {/*pass*/}
                        <FontAwesome
                            name="lock"
                            style={
                                Platform.OS === 'ios' ?
                                    styles.iconIOS :
                                    styles.icon
                            }
                        />
                        <TextInput
                            onChangeText={password => this.setState({
                                password
                            })}
                            placeholder="New password:"
                            secureTextEntry
                            placeholderTextColor="#fff"
                            style={
                                Platform.OS === 'ios' ?
                                    styles.txtusernameIOS :
                                    styles.txtusername
                            }
                            underlineColorAndroid='#fff'
                        />

                        {/*re-pass*/}
                        <FontAwesome
                            name="lock"
                            style={
                                Platform.OS === 'ios' ?
                                    styles.iconIOS :
                                    styles.icon
                            }
                        />
                        <TextInput
                            onChangeText={rePass => this.setState({
                                rePass
                            })}
                            placeholder="Retype password:"
                            secureTextEntry
                            placeholderTextColor="#fff"
                            style={
                                Platform.OS === 'ios' ?
                                    styles.txtpasswordIOS :
                                    styles.txtpassword
                            }
                            underlineColorAndroid='#fff'
                        />

                        <TouchableOpacity
                            onPress={() => { 
                                this.createNewPass(this.state.password, this.state.rePass); 
                            }}
                        >
                            <View
                                style={
                                    Platform.OS === 'ios' ?
                                        styles.buttonLoginIOS :
                                        styles.buttonLogin
                                }
                            >
                                <Text style={styles.textButton}>Done</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <Toast ref='toast' />
            </View>
        );
    }
}
