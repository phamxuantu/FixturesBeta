'use strict';

const { Dimensions, StyleSheet } = require('react-native');

const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    width: width / 3,
    textAlign: 'center'
  },
  listTable: {
    height: height / 12,
    backgroundColor: '#ddd'
  },
  active: {
    borderBottomWidth: 1,
    borderBottomColor: '#00CC33'
  },
  lable: {
    flexDirection: 'row',
    width,
    height: height / 15,
    backgroundColor: '#ddd',
    justifyContent: 'center'
  },
  blank: {
    width: width / 2,
    height: height / 15
  },
  textLable: {
    width: width / 2,
    height: height / 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  point: {
    height: height / 15,
    width: width / 12,
    paddingTop: height / 60,
    fontSize: width <= 320 ? 12 : 14
  },
  dataTable: {
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  table: {
    width: width / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowTable: {
    width: width / 2,
    height: height / 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  position: {
    width: width / 10,
    height: height / 15,
    textAlign: 'center',
    paddingTop: height / 60,
    fontSize: width <= 320 ? 12 : 14
  },
  logo: {
    width: width / 10,
    height: height / 15,
  },
  imgLogo: {
    width: width / 15,
    height: height / 15
  },
  nameTeam: {
    width: (3 * width) / 10,
    height: height / 15,
    paddingTop: height / 60,
    fontSize: width <= 320 ? 12 : 14
  }
});
