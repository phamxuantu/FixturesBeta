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

const styles = require('../../styles/ForgotPassStyle');


export default class AuthenticPhoneScreen extends Component {

    static navigationOptions = () => ({
        headerStyle: { position: 'absolute' }
    });

    constructor(props) {
        super(props);
        this.state = {
            phone: ''
        };
    }


    authenticPhone(phone) {
        if (phone === '') {
            this.refs.toast.show('Please enter phone number', DURATION.LENGTH_LONG);
        } else {
            fetch(
                'http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/Controllers/AuthenticPhone.php',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.props.navigation.state.params.email,
                        phone
                    })
                }
            )
                .then(response => response.json())
                .then(responseJson => {
                    //ToastAndroid.show(responseJson.password, ToastAndroid.LONG);
                    if (responseJson.notify === 'success') {
                        const email = this.props.navigation.state.params.email;
                        this.props.navigation.navigate('Screen_CreatePass', {
                            email
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

                        <Text style={styles.txtOtherLogin}>
                            {
                                `Enter the phone number with email 
                                ${
                                    this.props.navigation.state.params.email
                                }`
                            }
                        </Text>

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
                                    styles.txtusernameIOS :
                                    styles.txtusername
                            }
                            underlineColorAndroid='#fff'
                        />

                        <TouchableOpacity
                            onPress={() => { 
                                this.authenticPhone(this.state.phone); 
                            }}
                        >
                            <View
                                style={
                                    Platform.OS === 'ios' ? 
                                    styles.buttonLoginIOS : 
                                    styles.buttonLogin
                                }
                            >
                                <Text style={styles.textButton}>Next</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <Toast ref='toast' />
            </View>
        );
    }
}
