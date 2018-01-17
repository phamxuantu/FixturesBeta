'use strict';

const { Dimensions, StyleSheet } = require('react-native');

const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
container: {
    flex: 1
},
menuItem: {
    flexDirection: 'row',
    height: height / 12,
    alignItems: 'center'
},
imgHeader: {
    height: height / 4,
    width: (3 * width) / 4,
    marginBottom: 5
},
textMenuItem: {
    fontSize: 22,
    marginRight: 10,
    marginLeft: 10,
},
menuItemActive: {
    backgroundColor: '#00CC33',
    flexDirection: 'row',
    height: height / 12
},
textMenuItemActive: {
    color: '#fff',
    fontSize: 22,
    marginRight: 10,
    marginLeft: 10,
},
textMenuItemActiveIcon: {
    color: '#fff',
    fontSize: 25,
    marginRight: 10,
    marginLeft: 10,
    textAlign: 'center'
},
textMenuItemIcon: {
    fontSize: 25,
    marginRight: 10,
    marginLeft: 10,
    textAlign: 'center'
}
});
