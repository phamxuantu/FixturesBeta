'use strict';

const { Dimensions, StyleSheet } = require('react-native');

const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
    container: {
    flex: 1
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
});
