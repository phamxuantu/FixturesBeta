'use strict';

const { Dimensions, StyleSheet } = require('react-native');

const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
    container: {
        // position: 'relative'
    },
    background: {
        width,
        height,
        resizeMode: 'cover',
    },
    content: {
        position: 'absolute',
        zIndex: -1
    },
    formLogin: {
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    logoLogin: {
        width: width - 150,
        marginLeft: 75,
        marginTop: 15,
        marginBottom: 15,
        flex: 1,
        alignItems: 'center'
    },
    loginImg: {
        width: 100,
        height: 100
    },
    txtusernameIOS: {
        height: 30,
        borderBottomColor: '#fff',
        color: '#fff',
        borderBottomWidth: 1,
        fontSize: 18,
        paddingLeft: 35,
        width: width - 150,
        marginLeft: 75
    },
    txtpasswordIOS: {
        height: 30,
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        color: '#fff',
        fontSize: 18,
        marginBottom: 20,
        paddingLeft: 35,
        width: width - 150,
        marginLeft: 75
    },
    txtusername: {
        height: 40,
        color: '#fff',
        fontSize: 18,
        paddingLeft: 35,
        width: width - 150,
        marginLeft: 75
    },
    txtpassword: {
        height: 40,
        color: '#fff',
        fontSize: 18,
        marginBottom: 20,
        paddingLeft: 35,
        width: width - 150,
        marginLeft: 75
    },
    buttonLogin: {
        backgroundColor: '#00CC33',
        height: 50,
        borderRadius: 25,
        width: width - 150,
        marginLeft: 75,
        marginBottom: 20
    },
    buttonLoginIOS: {
        backgroundColor: '#00CC33',
        height: 50,
        borderRadius: 25,
        width: width - 150,
        marginLeft: 75,
        marginBottom: 20
    },
    textButton: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 10,
        backgroundColor: 'transparent'
    },
    iconIOS: {
        color: '#fff',
        fontSize: 24,
        top: 25,
        marginLeft: 75
    },
    icon: {
        color: '#fff',
        fontSize: 24,
        top: 28,
        marginLeft: 79
    },
    btnMenu: {
        color: '#fff',
        backgroundColor: 'transparent'
    },
    logo: {
        height: 100
    },
    txtOtherLogin: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        marginBottom: 20,
        width: width - 150,
        marginLeft: 75
    },
    forgotPassword: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        textDecorationLine: 'underline',
        width: width - 150,
        marginLeft: 75
    },

    bgMenuButton: {
        marginTop: 25,
        marginLeft: 35,
        width: 30,
        height: 30
    },

    contentIOS: {
        position: 'absolute',
        zIndex: -1
    },
});
