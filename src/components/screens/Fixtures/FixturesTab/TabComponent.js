import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    Dimensions, 
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class TabComponent extends Component {

    state = {
        activeTab: 'Screen_Fixtures'
    }

    clickItemMenu(name) {
        const { navigation } = this.props;
        this.setState({
            activeTab: name
        });
        navigation.navigate(name);
    }

    render() {
        const { activeTab } = this.state;
        return (
            <View 
                style={{
                    height: height / 15,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ddd'
                }}
            >
                <TouchableOpacity 
                    style={{ width: width / 2, borderRightWidth: 1, borderRightColor: '#000' }}
                    onPress={() => this.clickItemMenu('Screen_Fixtures')}
                >
                    <Text 
                        style={
                            activeTab === 'Screen_Fixtures' ? 
                            { fontSize: 18, color: '#00CC33', textAlign: 'center' } : 
                            { fontSize: 18, color: '#000', textAlign: 'center' }
                        }
                    >
                        Fixtures
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{ width: width / 2 }}
                    onPress={() => this.clickItemMenu('Screen_Upcoming')}
                >
                    <Text
                        style={
                            activeTab === 'Screen_Upcoming' ? 
                            { fontSize: 18, color: '#00CC33', textAlign: 'center' } : 
                            { fontSize: 18, color: '#000', textAlign: 'center' }
                        }
                    >
                        Upcoming
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
