'use strict';

const { Dimensions, StyleSheet } = require('react-native');

const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 10,
    fontSize: width <= 320 ? 13 : 17,
    // height: 14,
    width: width / 5,
    textAlign: 'center',
    // height: width <= 320 ? height / 15 : height / 12
  },
  listMatch: {
    height: width <= 320 ? height / 15 : height / 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd'
  },
  active: {
    borderBottomWidth: 1,
    borderBottomColor: '#00CC33',
    // height: width <= 320 ? height / 15 : height / 12
    // height: height / 12
  },
  fixtures: {
    height: height / 10,
    width,
    padding: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgLogo: {
    // width: Platform.OS === 'ios' ? window.width/25 : window.width/20,
    // height: Platform.OS === 'ios' ? window.height/25 : window.height/20
    width: width / 15,
    height: height / 15
  },
  date: {
    width: (3 * width) / 20,
    textAlign: 'center',
    fontSize: width <= 320 ? 11 : 13
  },
  homeTeam: {
    width: (3 * width) / 10,
    textAlign: 'right',
    paddingRight: 10,
    justifyContent: 'center',
    fontSize: width <= 320 ? 11 : 13
  },
  logo: {
    width: (3 * width) / 40,
    height: height / 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  result: {
    width: width / 10,
    textAlign: 'center'
  },
  awayTeam: {
    width: (3 * width) / 10,
    textAlign: 'left',
    paddingLeft: 10,
    justifyContent: 'center',
    fontSize: width <= 320 ? 11 : 13
  },
  currentMatchday: {
    color: '#33CC33',
    padding: 10,
    fontSize: width <= 320 ? 13 : 17,
    // height: width <= 320 ? height / 15 : height / 12,
    // height: 14,
    width: width / 5,
    textAlign: 'center'
  }
});
