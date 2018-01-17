'use strict';

const { Dimensions, StyleSheet } = require('react-native');

const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    width,
    height: width - (width / 9)
  },
  thumbnail: {
    width,
    height: (3 * width) / 5
  },
  imgThumbnail: {
    width,
    height: (3 * width) / 5
  },
  title: {
    width,
    height: width / 6,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 15,
    paddingTop: 5,
    marginBottom: 10
  },
  datePost: {
    width,
    height: width / 15,
    alignItems: 'flex-start',
    padding: 10
  },
  textTitle: {
    fontSize: width <= 320 ? 18 : 20,
    fontWeight: 'bold'
  },
  content: {
    width,
    padding: 10,
  },
  line: {
    width: width - 40,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333333',
    marginLeft: 20
  }
});
