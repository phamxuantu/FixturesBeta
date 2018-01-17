'use strict';

const { Dimensions, StyleSheet } = require('react-native');

const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3'
  },
  news: {
    width,
    height: width - (width / 5),
    backgroundColor: '#fff',
    marginBottom: 10
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
    height: width / 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5
  },
  datePost: {
    width,
    height: width / 15,
    alignItems: 'flex-end',
    padding: 10
  },
  textDatePost: {
    fontSize: width <= 320 ? 12 : 14
  },
  textTitle: {
    fontSize: width <= 320 ? 14 : 16,
    fontWeight: 'bold',
    color: '#5ca038'
  }
});
