import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  Dimensions
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

export default class HeaderMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrCaptionLeague: [],
            arrIdLeague: [],
            caption: '',
            dataLeague: '',
            posSelected: 0
        };
    }

    render() {
        const { navigation } = this.props;
        return (
            <View 
                style={{ 
                    backgroundColor: '#00CC33',
                    flexDirection: 'row', 
                    alignItems: 'center',
                    paddingLeft: 10,
                    height: Platform.OS === 'ios' ? 65 : 50,
                    paddingTop: Platform.OS === 'ios' ? 15 : 0 
                }}
            >
                <TouchableOpacity 
                    onPress={() => navigation.navigate('DrawerOpen')} 
                    style={{
                        marginRight: 20,
                        width: width / 10
                    }}
                >
                    <FontAwesome name='bars' size={30} />
                </TouchableOpacity>
                <Text 
                    style={{
                        color: '#000',
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginRight: 20,
                        width: ((7 * width) / 10) - 10,
                        textAlign: 'center'
                    }}
                >
                    {this.props.title}
                </Text>
                <TouchableOpacity 
                    style={{ 
                        width: width / 10,
                     }}
                    onPress={() => this.props.navigation.navigate('Screen_Setting', 
                        { 
                            screen: this.props.screen
                        })
                    }
                >
                    <FontAwesome name='cog' size={30} />
                </TouchableOpacity>
            </View>
        );
    }
}
