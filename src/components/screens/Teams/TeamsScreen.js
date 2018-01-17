import React, { Component } from 'react';
import { View, TouchableOpacity, Text, FlatList, AsyncStorage } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { CachedImage } from 'react-native-cached-image';

const styles = require('../../styles/TeamsStyle');

const MenuButton = props =>
  <TouchableOpacity
    onPress={() => {
      props.navigation.navigate('DrawerOpen');
    }}
  >
    <FontAwesome name="bars" size={30} style={{ marginLeft: 10 }} />
  </TouchableOpacity> 
;

export default class TeamsScreen extends Component {
  
  static navigationOptions = ({ navigation }) => ({
    title: 'Teams',
    headerLeft: <MenuButton navigation={navigation} />,
    headerStyle: { backgroundColor: '#00CC33' }
  });

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      isLoading: false,
      idLeague: ''
    };
  }

  componentDidMount = () => {
    this.setState({
      isLoading: true
    });
    AsyncStorage.getItem('teams', (err, result) => {
      this.setState({
        data: JSON.parse(result),
        isLoading: false
      });
    });
  }

  render() {
    const { container, teams, imgLogo, nameTeam, Name, logo } = styles;
    return (
      <View style={container}>
      <FlatList 
        data={this.state.data}
        keyExtractor={item => item}
        renderItem={({ item, index }) => (
          <TouchableOpacity 
            key={index} 
            style={teams} 
            onPress={
              () => this.props.navigation.navigate('Screen_SingleTeam', 
              { id: item.id, logo: item.logo, nameTeam: item.name })
            }
          >
            <View style={logo}>
                <CachedImage
                  resizeMode="center"
                  style={imgLogo}
                  source={{ uri: item.logo }}
                />
            </View>
              <View style={nameTeam}>
                <Text style={Name}>{item.name}</Text>
                <Text style={Name}>{item.shortName}</Text>
              </View>
          </TouchableOpacity>
        )}
      />
      </View>
    );
  }
}
