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

const styles = require('../../styles/LoginStyle');


export default class LoginScreen extends Component {

    static navigationOptions = () => ({
        headerStyle: { position: 'absolute' }
    });

    constructor(props) {
        super(props);
        this.state = { oldPass: '', newPass: '', reNewPass: '' };
    }


    changePass(oldPass, newPass, reNewPassword) {
        if ((oldPass === '') && (newPass === '') && (reNewPassword === '')) {
            // console.log('check toast', 'rong ca hai');
            this.refs.toast.show('Please enter all fields', DURATION.LENGTH_LONG);
        } else if (oldPass === '') {
            this.refs.toast.show('Please enter old password', DURATION.LENGTH_LONG);
        } else if (newPass === '') {
            this.refs.toast.show('Please enter new password', DURATION.LENGTH_LONG);
        } else if (reNewPassword === '') {
            this.refs.toast.show('Please retype new password', DURATION.LENGTH_LONG);
        } else if (reNewPassword !== newPass) {
            this.refs.toast.show('Retype password not match', DURATION.LENGTH_LONG);
        } else {
            fetch(
                'http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/Controllers/ChangePass.php',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: this.props.navigation.state.params.id,
                        oldPass,
                        newPass
                    })
                }
            )
                .then(response => response.json())
                .then(responseJson => {
                    //ToastAndroid.show(responseJson.password, ToastAndroid.LONG);
                    if (responseJson.notify === 'success') {
                        this.refs.toast.show('Password changed', DURATION.LENGTH_LONG);
                        this.props.navigation.goBack();
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
                        {/*old pass*/}
                        <FontAwesome
                            name="lock"
                            style={
                                Platform.OS === 'ios' ?
                                    styles.iconIOS :
                                    styles.icon
                            }
                        />
                        <TextInput
                            onChangeText={oldPass => this.setState({
                                oldPass
                            })}
                            placeholder="Old password:"
                            secureTextEntry
                            placeholderTextColor="#fff"
                            style={
                                Platform.OS === 'ios' ?
                                    styles.txtusernameIOS :
                                    styles.txtusername
                            }
                            underlineColorAndroid='#fff'
                        />
                        {/*new pass*/}
                        <FontAwesome
                            name="lock"
                            style={
                                Platform.OS === 'ios' ?
                                    styles.iconIOS : styles.icon
                            }
                        />
                        <TextInput
                            onChangeText={newPass => this.setState({
                                newPass
                            })}
                            placeholder="New password:"
                            secureTextEntry
                            placeholderTextColor="#fff"
                            style={
                                Platform.OS === 'ios' ?
                                    styles.txtusernameIOS :
                                    styles.txtusername
                            }
                            underlineColorAndroid="#fff"
                        />
                        {/*renew pass*/}
                        <FontAwesome
                            name="lock"
                            style={
                                Platform.OS === 'ios' ?
                                    styles.iconIOS : styles.icon
                            }
                        />
                        <TextInput
                            onChangeText={reNewPass => this.setState({
                                reNewPass
                            })}
                            placeholder="Retype new password:"
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
                                this.changePass(
                                    this.state.oldPass, 
                                    this.state.newPass, 
                                    this.state.reNewPass
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
                                <Text style={styles.textButton}>Change</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <Toast ref='toast' />
            </View>
        );
    }
}
