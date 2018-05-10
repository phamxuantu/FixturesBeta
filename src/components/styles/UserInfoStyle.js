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
        backgroundColor: '#fff',
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
        width: width - 50,
        // marginLeft: 20,
        marginBottom: 5,
        flexDirection: 'row'
    },
    txtPhoneIOS: {
        marginBottom: 20,
        width: width - 50,
        // marginLeft: 20,
        flexDirection: 'row'
    },
    txtusername: {
        width: width - 50,
        // marginLeft: 20,
        marginBottom: 5,
        flexDirection: 'row'
    },
    txtPhone: {
        marginBottom: 20,
        width: width - 50,
        // marginLeft: 20
        flexDirection: 'row'
    },
    txtLableInfo: {
        textAlign: 'left',
        color: '#000',
        fontSize: 18,
        width: (width - 50) / 2
    },
    txtContentInfo: {
        textAlign: 'right',
        color: '#000',
        fontSize: 18,
        width: (width - 50) / 2
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
        color: '#000',
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 10,
        backgroundColor: 'transparent'
    },
    btnMenu: {
        color: '#000',
        backgroundColor: 'transparent'
    },
    logo: {
        height: 100
    },

    bgMenuButton: {
        marginTop: 25,
        marginLeft: 35,
        width: 30,
        height: 30
    },

    contentIOS: {
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: -1
    },
});
