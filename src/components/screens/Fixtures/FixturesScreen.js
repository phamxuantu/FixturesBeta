import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
  Dimensions,
  AsyncStorage
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CachedImage } from 'react-native-cached-image';

const styles = require('../../styles/FixturesStyle');

const { height, width } = Dimensions.get('window');


const MenuButton = props =>
  <TouchableOpacity
    onPress={() => {
      props.navigation.navigate('DrawerOpen');
    }}
  >
    <FontAwesome name="bars" size={30} style={{ marginLeft: 10 }} />
  </TouchableOpacity>;


export default class FixturesScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Fixtures',
    headerLeft: <MenuButton navigation={navigation} />,
    headerStyle: { backgroundColor: '#00CC33' }
  });

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      listMatchdays: [],
      isLoading: true,
      checkFlatlist: false,
      data: '',
      fixturesForMatchday: ''
    };
  }

  componentDidMount = () => {
    this.getFixtures();
  }

  getFixtures() {
    this.setState({
      isLoading: true
    });
    AsyncStorage.getItem('fixtures', (err, result) => {
      this.setState({
        data: JSON.parse(result),
        isLoading: false
      });
      this.getFixturesForMatchday();
    });
  }

  getListMatchdays(matchday) {
    this.setState({
      isLoading: true,
      checkFlatlist: true
    });
    const listMatchdays = [];
    for (let i = 0; i < this.state.data.numberOfMatchdays; i++) {
      listMatchdays.push({ key: `Day ${i + 1}` });
    }
    this.setState({
      listMatchdays,
      key: `Day ${matchday}`,
      isLoading: false,
      checkFlatlist: false
    }, () => {
      if ((matchday >= 3) && (matchday <= this.state.data.numberOfMatchdays - 2)) {
        this.refs.listMatchday.scrollToIndex({ animated: true, index: matchday - 3 });
      }
    });
    // this.showFixtures();
  }

  getFixturesForMatchday(matchday = this.state.data.currentMatchday) {
    const fixtures = this.state.data.fixtures[matchday - 1];
    this.setState({
      fixturesForMatchday: fixtures
    });
    this.getListMatchdays(matchday);
  }

  getItemLayout = (data, index) => ({
    length: width / 5,
    offset: (width / 5) * index,
    index,
  });


  showFixtures() {
    // console.log("lich thi dau: ", fixtures);
    let result = null;
    if (this.state.fixturesForMatchday !== '') {
      result = (
      <FlatList 
        data={this.state.fixturesForMatchday}
        keyExtractor={item => item}
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

  cutString(string) {
    const stringCut = string.split(' ');
    return stringCut[1];
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.listMatch}>
        {!this.state.checkFlatlist ? (
          <FlatList
            ref='listMatchday'
            horizontal
            showsHorizontalScrollIndicator={false}
            extraData={this.state}
            initialScrollIndex={parseInt(this.cutString(this.state.key), 0) - 3}
            // initialScrollIndex={this.state.data.currentMatchday}
            getItemLayout={this.getItemLayout}
            data={this.state.listMatchdays}
            renderItem={({ item, index }) => 
              (<TouchableOpacity
                key={index}
                style={item.key === this.state.key ? styles.active : null}
                onPress={() => {
                  if (!this.state.isLoading) {
                    this.setState({
                      key: item.key
                    });
                    this.getFixturesForMatchday(parseInt(this.cutString(item.key), 0));
                  }
                }}
              >
                <Text 
                  style={
                    this.cutString(item.key) === this.state.data.currentMatchday.toString() ? 
                    styles.currentMatchday : 
                    styles.item
                  }
                >
                {item.key}
                </Text>
              </TouchableOpacity>)
            }
          />
        )
        :
        null
      }
        </View>
        <View style={{ paddingBottom: height / 10 }}>
          {this.state.isLoading ? <ActivityIndicator /> : this.showFixtures() }
        </View>
      </View>
    );
  }
}
