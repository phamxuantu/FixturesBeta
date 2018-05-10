import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  // Dimensions,
  AsyncStorage
} from 'react-native';
import { CachedImage } from 'react-native-cached-image';
import HeaderMenu from '../../main/HeaderMenu';

const styles = require('../../../styles/UpcomingStyle');

// const { height } = Dimensions.get('window');

export default class Upcoming extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: (
      <HeaderMenu navigation={navigation} title='Fixtures' screen='Screen_Upcoming' />
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: '',
    };
  }

  componentDidMount = () => {
    this.getFixtures();
  }

  getFixtures() {
    this.setState({
      isLoading: true
    });
    AsyncStorage.getItem('upcoming', (err, result) => {
      this.setState({
        data: JSON.parse(result),
        isLoading: false
      });
    });
  }

  showFixtures() {
    // console.log("lich thi dau: ", fixtures);
    let result = null;
    if (this.state.data !== '') {
      result = (
      <FlatList 
        data={this.state.data}
        renderItem={({ item, index }) => 
          <View key={index} style={styles.fixtures}>
            <Text style={styles.date}>
              {item.date}
            </Text>

            <Text style={styles.homeTeam}>
              {item.shortHomeName}
            </Text>

            <View style={styles.logo}>
              <CachedImage 
                resizeMode='center' 
                style={styles.imgLogo} 
                source={{ uri: item.logoHome }} 
              />
            </View>

            <Text style={styles.result}>
              {item.goalsHomeTeam} - {item.goalsAwayTeam}
            </Text>

            <View style={styles.logo}>
              <CachedImage 
                resizeMode='center' 
                style={styles.imgLogo} 
                source={{ uri: item.logoAway }} 
              />
            </View>

            <Text style={styles.awayTeam}>
              {item.shortAwayName}
            </Text>
          </View>
        }
      />);
    }
    return result;
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          {this.state.isLoading ? <ActivityIndicator /> : this.showFixtures() }
        </View>
      </View>
    );
  }
}
