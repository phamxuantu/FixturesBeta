'use strict';

const { Dimensions, StyleSheet } = require('react-native');

const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    header: {
        width,
        height: height / 2,
        backgroundColor: '#00CC33'
    },
    infoTeam: {
        width,
        height: height / 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        paddingBottom: 10
    },
    logo: {
        width,
        height: height / 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgLogo: {
        width: width / 4,
        height: height / 4,
    },
    name: {
        fontSize: width <= 320 ? 16 : 18,
        color: '#fff'
    },
    infoTable: {
        flexDirection: 'row',
        width,
        height: height / 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    table: {
        width: width / 3,
        height: height / 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTable: {
        fontSize: width <= 320 ? 20 : 22,
        color: '#fff'
    },
    lable: {
        fontSize: width <= 320 ? 16 : 18,
        color: '#000',
        textAlign: 'center'
    },
    player: {
        flexDirection: 'row',
        width,
        height: height / 5,
        backgroundColor: '#fff',
        marginBottom: 5
    },
    namePlayer: {
        width: width / 2,
        height: height / 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInfo: {
        fontSize: width <= 320 ? 14 : 16
    },
    infoPlayer: {
        width: width / 2,
        height: height / 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textName: {
        fontSize: width <= 320 ? 18 : 20,
        fontWeight: 'bold'
    }
});
