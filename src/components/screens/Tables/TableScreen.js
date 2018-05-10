import React, { Component } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  ScrollView, 
  FlatList,
  ActivityIndicator,
  AsyncStorage 
} 
from 'react-native';
import { CachedImage } from 'react-native-cached-image';
import HeaderMenu from '../main/HeaderMenu';

const styles = require('../../styles/TableStyle');

export default class TableScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: (
      <HeaderMenu navigation={navigation} title='Tables' />
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      key: 'Brief',
      data: '',
      isLoading: false
    };
  }

  componentDidMount = () => {
    this.setState({
      isLoading: true
    });
    AsyncStorage.getItem('tables', (err, result) => {
      this.setState({
        data: JSON.parse(result),
        isLoading: false
      });
    });
  }

  getTeamTables() {
    const tables = this.state.data;
    let result = null;
    if (tables !== '') {
      result = (
        <FlatList 
          data={tables}
          keyExtractor={item => item}
          extraData={this.state}
          renderItem={({ item, index }) => 
          <TouchableOpacity 
            onPress={ 
              () => this.props.navigation.navigate('Screen_SingleTeam', 
              { id: item.id, logo: item.logo, nameTeam: item.teamName })}
          >
            <View key={index} style={styles.rowTable}>
              <Text style={styles.position}>{item.position}</Text>
              <View style={styles.logo}>
                <CachedImage
                  resizeMode="center"
                  style={styles.imgLogo}
                  source={{ uri: item.logo }}
                />
              </View>
              <Text style={styles.nameTeam}>{item.shortName}</Text>
            </View>
            </TouchableOpacity>
          }
        />
      );
    }
    return result;
  }

  getPointTable() {
    const data = this.state.data;
    let result = null;
    if (data !== '') {
      result = data.map((table, i) => (
        <View key={i} style={styles.rowTable}>
          <Text style={styles.point}>{table.playedGames}</Text>
          <Text style={styles.point}>{table.wins}</Text>
          <Text style={styles.point}>{table.draws}</Text>
          <Text style={styles.point}>{table.losses}</Text>
          <Text style={styles.point}>{table.goalDifference}</Text>
          <Text style={styles.point}>{table.points}</Text>
        </View>
      ));
    }
    return result;
  }

  selectTables() {
    const data = this.state.data;
    let result = null;
    if (data !== '') {
      if (this.state.key === 'Home') {
        result = data.map((table, i) => (
          <View key={i} style={styles.rowTable}>
            <Text style={styles.point}>{table.home.playedGames}</Text>
            <Text style={styles.point}>{table.home.wins}</Text>
            <Text style={styles.point}>{table.home.draws}</Text>
            <Text style={styles.point}>{table.home.losses}</Text>
            <Text style={styles.point}>{table.home.goals}</Text>
            <Text style={styles.point}>{table.home.goalsAgainst}</Text>
          </View>
        ));
      } else {
        result = data.map((table, i) => (
          <View key={i} style={styles.rowTable}>
            <Text style={styles.point}>{table.away.playedGames}</Text>
            <Text style={styles.point}>{table.away.wins}</Text>
            <Text style={styles.point}>{table.away.draws}</Text>
            <Text style={styles.point}>{table.away.losses}</Text>
            <Text style={styles.point}>{table.away.goals}</Text>
            <Text style={styles.point}>{table.away.goalsAgainst}</Text>
          </View>
        ));
      }
    }
    return result;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.listTable}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[{ key: 'Brief' }, { key: 'Home' }, { key: 'Away' }]}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={item.key === this.state.key ? styles.active : null}
                onPress={() => {
                  this.setState({
                    key: item.key
                  });
                }}
              >
                <Text style={styles.item}>{item.key}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.lable}>
          <View style={styles.blank} />
          {this.state.key === 'Brief' ? (
            <View style={styles.textLable}>
              <Text style={styles.point}>P</Text>
              <Text style={styles.point}>W</Text>
              <Text style={styles.point}>D</Text>
              <Text style={styles.point}>L</Text>
              <Text style={styles.point}>GD</Text>
              <Text style={styles.point}>PTS</Text>
            </View>
          ) : (
            <View style={styles.textLable}>
              <Text style={styles.point}>P</Text>
              <Text style={styles.point}>W</Text>
              <Text style={styles.point}>D</Text>
              <Text style={styles.point}>L</Text>
              <Text style={styles.point}>F</Text>{/*goal for*/}
              <Text style={styles.point}>A</Text>{/*goal against*/}
            </View>
          )}
          
        </View>

        {this.state.isLoading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView>
            <View style={styles.dataTable}>
              <View style={styles.table}>{this.getTeamTables()}</View>

              {
                this.state.key === 'Brief' ? 
                (<View style={styles.table}>{this.getPointTable()}</View>) : 
                (<View style={styles.table}>{this.selectTables()}</View>)
              }
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
