'use strict';

const { Dimensions, StyleSheet } = require('react-native');

const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCCCC',
  },
  teams: {
    flexDirection: 'row',
    height: height / 5,
    marginBottom: 3,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15
  },
  imgLogo: {
    width: width / 7,
    height: height / 7
  },
  logo: {
    width: width / 3,
    height: height / 5,
    justifyContent: 'center'
  },
  nameTeam: {
    width: (2 * width) / 3,
    height: height / 5,
    justifyContent: 'center'
  },
  Name: {
    fontSize: width <= 320 ? 16 : 18,
  }
});
