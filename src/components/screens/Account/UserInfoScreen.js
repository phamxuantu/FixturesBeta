import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    Platform,
    AsyncStorage
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import logoLogin from '../../../images/logo.png';

const styles = require('../../styles/UserInfoStyle');


export default class UserInfoScreen extends Component {

    static navigationOptions = () => ({
        headerStyle: { position: 'absolute' }
    });

    constructor(props) {
        super(props);
        this.state = {
            dataUser: ''
        };
    }

    componentDidMount() {
        // console.log('test data tranfer', this.props.navigation.state.params.dataUser);
        this.setState({
            dataUser: JSON.parse(this.props.navigation.state.params.dataUser)
        });
    }

    hidePhoneNuber(phone) {
        // console.log('test state', this.state.dataUser);
        if (phone != null) {
            // console.log('test phone', phone);
            let result = '';
            for (let i = 0; i < phone.length; i++) {
                if (i < phone.length - 2) {
                    result = `${result}*`;
                } else {
                    result = `${result}${phone[i]}`;
                }
            }
            return result;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={Platform.OS === 'ios' ? styles.contentIOS : styles.content} />
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
                        <View style={{ alignItems: 'center' }}>
                            {/*full name*/}
                            <View 
                                style={
                                    Platform.OS === 'ios' ?
                                    styles.txtusernameIOS :
                                    styles.txtusername
                                }
                            >
                                <Text 
                                    style={styles.txtLableInfo}
                                >
                                    Full name: 
                                </Text>
                                <Text
                                    style={styles.txtContentInfo}
                                    numberOfLines={1}
                                >
                                    {this.state.dataUser.fullname}
                                </Text>
                            </View>
                            {/*username*/}
                            <View
                                style={
                                    Platform.OS === 'ios' ?
                                        styles.txtusernameIOS :
                                        styles.txtusername
                                }
                            >
                                <Text
                                    style={styles.txtLableInfo}
                                >
                                    Username:
                                </Text>
                                <Text
                                    style={styles.txtContentInfo}
                                    numberOfLines={1}
                                >
                                    {this.state.dataUser.username}
                                </Text>
                            </View>
                            {/*email*/}
                            <View
                                style={
                                    Platform.OS === 'ios' ?
                                        styles.txtusernameIOS :
                                        styles.txtusername
                                }
                            >
                                <Text
                                    style={styles.txtLableInfo}
                                >
                                    Email:
                                </Text>
                                <Text
                                    style={styles.txtContentInfo}
                                    numberOfLines={1}
                                >
                                    {this.state.dataUser.email}
                                </Text>
                            </View>
                            {/*phone*/}
                            <View
                                style={
                                    Platform.OS === 'ios' ?
                                        styles.txtusernameIOS :
                                        styles.txtusername
                                }
                            >
                                <Text
                                    style={styles.txtLableInfo}
                                >
                                    Phone number:
                                </Text>
                                <Text
                                    style={styles.txtContentInfo}
                                    numberOfLines={1}
                                >
                                    {this.hidePhoneNuber(this.state.dataUser.phone)}
                                </Text>
                            </View>
                            {/*premium*/}
                            <View
                                style={
                                    Platform.OS === 'ios' ?
                                        styles.txtPhoneIOS :
                                        styles.txtPhone
                                }
                            >
                                <Text
                                    style={styles.txtLableInfo}
                                >
                                    User premium:
                                </Text>
                                <Text
                                    style={styles.txtContentInfo}
                                    numberOfLines={1}
                                >
                                    0 day
                                </Text>
                            </View>
                        </View>

                        {/*button change pass*/}
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Screen_ChangePass', 
                                { 
                                    id: this.state.dataUser.id 
                                });
                            }}
                        >
                            <View
                                style={
                                    Platform.OS === 'ios' ?
                                        styles.buttonLoginIOS :
                                        styles.buttonLogin
                                }
                            >
                                <Text style={styles.textButton}>Change Password</Text>
                            </View>
                        </TouchableOpacity>

                        {/*button log out*/}
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Screen_Login');
                                AsyncStorage.setItem('userInfo', '');
                            }}
                        >
                            <View
                                style={
                                    Platform.OS === 'ios' ?
                                        styles.buttonLoginIOS :
                                        styles.buttonLogin
                                }
                            >
                                <Text style={styles.textButton}>Log out</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
