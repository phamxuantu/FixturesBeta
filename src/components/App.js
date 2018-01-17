import React, { Component } from 'react';

import { AsyncStorage, ActivityIndicator, View } from 'react-native';

import Main from './screens/main/Main';

// function handleFirstConnectivityChange(isConnected) {
//   console.log(`App, is ${isConnected ? 'online' : 'offline'}`);
//   if (!isConnected) {
//     NetInfo.isConnected.removeEventListener(
//       'connectionChange',
//       handleFirstConnectivityChange
//     );
//     NetInfo.isConnected.addEventListener(
//       'connectionChange',
//       handleFirstConnectivityChange
//     );
//   }
//   AsyncStorage.setItem('network', isConnected ? 'online' : 'offline');
// }
// NetInfo.isConnected.addEventListener(
//   'connectionChange',
//   handleFirstConnectivityChange
// );

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentWillMount() {
    this.setState({
      isLoading: true
    });
    fetch('http://demo.tntechs.com.vn/xuantu/demo/Fixtures-Test/Controllers/fixtures.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idLeague: '',
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson);
      AsyncStorage.setItem('fixtures', JSON.stringify(responseJson));
    })
    .catch((error) => {
      console.error(error);
    });
    fetch('http://demo.tntechs.com.vn/xuantu/demo/Fixtures-Test/Controllers/getTables.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idLeague: '',
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson);
      AsyncStorage.setItem('tables', JSON.stringify(responseJson));
    })
    .catch((error) => {
      console.error(error);
    });
    fetch('http://demo.tntechs.com.vn/xuantu/demo/Fixtures-Test/Controllers/getTeams.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idLeague: '',
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson);
      AsyncStorage.setItem('teams', JSON.stringify(responseJson));
      this.setState({
        isLoading: false
      });
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        isLoading: false
      });
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        { this.state.isLoading ? <ActivityIndicator style={{ marginTop: 20 }} /> : <Main /> }
      </View>
    );
  }
}
