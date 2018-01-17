'use strict';

const { Dimensions, StyleSheet } = require('react-native');

const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
    backgroundColor: '#fff'
  },
  team: {
    height: height / 7,
    width,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  infoTeam: {
    height: height / 7,
    flexDirection: 'row',
    width
  },
  nameTeam: {
    height: height / 7,
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#EEEEEE',
    marginRight: 10
  },
  logoHeader: {
    width: width / 2,
    height: height / 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgLogoHeader: {
    width: width / 14,
    height: height / 14,
  },
  name: {
    fontSize: 14
  },
  btnChange: {
    width: width / 5,
    height: height / 28,
    borderRadius: 25,
    backgroundColor: '#00CC33',
    justifyContent: 'center'
  },
  txtChange: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent'

  },
  detailTeam: {
    height: height / 7,
    width: width / 2,
    justifyContent: 'center'
  },
  detail: {
    fontSize: width <= 320 ? 12 : 14
  },
  calendar: {
    paddingTop: 5,
    height: height / 2,
    width
  },
  fixtures: {
    height: height / 10,
    width,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginLeft: 10
  },
  imgLogo: {
    width: width / 15,
    height: height / 15
  },
  date: {
    width: (3 * width) / 20,
    textAlign: 'center',
    fontSize: 13
  },
  homeTeam: {
    width: (3 * width) / 10,
    textAlign: 'right',
    paddingRight: 10,
    justifyContent: 'center',
    fontSize: 13
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
    fontSize: 13
  },
});
