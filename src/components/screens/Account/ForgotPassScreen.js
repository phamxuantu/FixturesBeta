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


export default class ForgotPassScreen extends Component {

    static navigationOptions = () => ({
        headerStyle: { position: 'absolute' }
    });

    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }


    forgotPass(email) {
        if (email === '') {
            this.refs.toast.show('Please enter email', DURATION.LENGTH_LONG);
        } else {
            fetch(
                'http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/Controllers/ForgotPass.php',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email
                    })
                }
            )
                .then(response => response.json())
                .then(responseJson => {
                    //ToastAndroid.show(responseJson.password, ToastAndroid.LONG);
                    if (responseJson.notify === 'success') {
                        this.props.navigation.navigate('Screen_Authentic',
                            {
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
                            Enter the email you want to recover the password
                        </Text>

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
                        <TouchableOpacity
                            onPress={() => {
                                this.forgotPass(this.state.email); 
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
