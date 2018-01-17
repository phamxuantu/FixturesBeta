import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = require('../../styles/MenuStyle');

const logoMenu = require('../../../images/logoMenu.png');

const { width } = Dimensions.get('window');

export default class Menu extends Component {

    state = {
        activeMenu: 'News'
    }

    clickItemMenu(name) {
        const { navigation } = this.props;
        this.setState({
            activeMenu: name
        });
        navigation.navigate(name);
    }

    render() {
        const { 
            textMenuItemIcon, 
            menuItem, 
            menuItemActive, 
            textMenuItem, 
            textMenuItemActive, 
            container, 
            textMenuItemActiveIcon, 
            imgHeader } = styles;
        const { activeMenu } = this.state;
        return (
            <View style={container}>
                <View>
                    <Image 
                        resizeMode='cover' 
                        style={imgHeader} 
                        source={logoMenu} 
                    />
                </View>
                <TouchableOpacity 
                    style={[menuItem, this.state.activeMenu === 'News' ? menuItemActive : null]} 
                    onPress={() => this.clickItemMenu('News')}
                >
                    <View style={{ width: width / 7 }}>
                        <FontAwesome 
                            style={
                                [textMenuItemIcon, activeMenu === 'News' ? 
                                textMenuItemActiveIcon : 
                                null]
                            } 
                            name="newspaper-o" 
                        />
                    </View>
                    <View style={{ width: (6 * width) / 7 }}>
                        <Text
                            style={[textMenuItem, activeMenu === 'News' ? 
                                    textMenuItemActive : 
                                    null]
                                }
                        >
                            News
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[menuItem, this.state.activeMenu === 'Fixtures' ? 
                            menuItemActive : 
                            null]
                        } 
                    onPress={() => this.clickItemMenu('Fixtures')}
                >
                    <View style={{ width: width / 7 }}>
                        <FontAwesome 
                            style={
                                [textMenuItemIcon, activeMenu === 'Fixtures' ? 
                                textMenuItemActiveIcon : null]
                            } 
                            name="calendar"
                        />
                    </View>
                    <View style={{ width: (6 * width) / 7 }}>
                        <Text
                            style={
                                [textMenuItem, activeMenu === 'Fixtures' ? 
                                textMenuItemActive : 
                                null]
                            }
                        >
                            Fixtures
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={
                        [menuItem, this.state.activeMenu === 'Tables' ? 
                        menuItemActive : 
                        null]
                    } 
                    onPress={() => this.clickItemMenu('Tables')}
                >
                    <View style={{ width: width / 7 }}>
                        <FontAwesome 
                            style={
                                [textMenuItemIcon, activeMenu === 'Tables' ? 
                                textMenuItemActiveIcon : null]
                            } 
                            name="list-ul" 
                        />
                    </View>
                    <View style={{ width: (6 * width) / 7 }}>
                        <Text
                            style={
                                [textMenuItem, activeMenu === 'Tables' ? 
                                textMenuItemActive : null]
                            }
                        >
                            Tables
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={
                        [menuItem, this.state.activeMenu === 'Teams' ? 
                        menuItemActive : 
                        null]
                    } 
                    onPress={() => this.clickItemMenu('Teams')}
                >
                    <View style={{ width: width / 7 }}>
                        <FontAwesome 
                            style={
                                [textMenuItemIcon, activeMenu === 'Teams' ? 
                                textMenuItemActiveIcon : 
                                null]
                            } 
                            name="laptop"
                        />
                    </View>
                    <View style={{ width: (6 * width) / 7 }}>
                        <Text
                            style={
                                [textMenuItem, activeMenu === 'Teams' ? 
                                textMenuItemActive : 
                                null]
                            }
                        >
                            Teams
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={
                        [menuItem, this.state.activeMenu === 'MyTeam' ? 
                        menuItemActive : 
                        null]
                    } 
                    onPress={() => this.clickItemMenu('MyTeam')}
                >
                    <View style={{ width: width / 7 }}>
                        <FontAwesome 
                            style={
                                [textMenuItemIcon, activeMenu === 'MyTeam' ? 
                                textMenuItemActiveIcon : 
                                null]
                            }
                            name="heart"
                        />
                    </View>
                    <View style={{ width: (6 * width) / 7 }}>
                        <Text
                            style={
                                [textMenuItem, activeMenu === 'MyTeam' ? 
                                textMenuItemActive : 
                                null]
                            }
                        >
                            My Team
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity 
                        style={
                            [menuItem, this.state.activeMenu === "Account" ? 
                            menuItemActive : 
                            null]
                        } 
                        onPress={() => this.clickItemMenu("Account")}
                    >
                    <View style={{ width: width / 7 }}>
                        <FontAwesome 
                            style={
                                [textMenuItemIcon, activeMenu === "Account" ? 
                                textMenuItemActiveIcon : 
                                null]
                            } 
                            name="user-o"
                        />
                    </View>
                    <View style={{ width: (6 * width) / 7 }}>
                        <Text
                            style={
                                [textMenuItem, activeMenu === "Account" ? 
                                textMenuItemActive : 
                                null]
                            }
                        >
                            Account
                        </Text>
                    </View>
                </TouchableOpacity> */}

                <TouchableOpacity 
                    style={
                        [menuItem, this.state.activeMenu === 'Account' ? 
                        menuItemActive : 
                        null]
                    } 
                    onPress={() => Alert.alert('Comming soon')}
                >
                    <View style={{ width: width / 7 }}>
                        <FontAwesome 
                            style={
                                [textMenuItemIcon, activeMenu === 'Account' ? 
                                textMenuItemActiveIcon : 
                                null]
                            } 
                            name="user-o" 
                        />
                    </View>
                    <View style={{ width: (6 * width) / 7 }}>
                        <Text
                            style={
                                [textMenuItem, activeMenu === 'Account' ? 
                                textMenuItemActive : 
                                null]
                            }
                        >
                            Account
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
