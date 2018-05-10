'use strict';

const { Dimensions, StyleSheet } = require('react-native');

const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCCCC',
  },
  caption: {
      height: height / 7,
      width,
      flexDirection: 'row',
      marginBottom: 5,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingLeft: 10
  },
  imgLogo: {
    width: width / 12,
    height: height / 12
  },
  logo: {
    width: width / 5,
    height: height / 10,
    justifyContent: 'center'
  },
  leagueSelected: {
      color: '#00CC33',
      fontSize: 18
  },
  captionLeague: {
      color: '#000',
      fontSize: 18
  }
});
