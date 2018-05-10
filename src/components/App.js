import React, { Component } from 'react';

import { AsyncStorage, ActivityIndicator, View } from 'react-native';

import Main from './screens/main/Main';

const PushNotification = require('react-native-push-notification');

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
    PushNotification.configure({
      onNotification: () => function (notification) {
        console.log('NOTIFICATION:', notification);
      }
    });
    this.state = {
      isLoading: false,
      idLeague: ''
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('fixtures', (err, result) => {
      if (result === null) {
        const date = new Date();
        date.setHours(6);
        // const date = new Date(Date.now() + (60 * 1000));
        PushNotification.localNotificationSchedule({
          message: '10 matches will be played today!!!',
          date,
          repeatType: 'day'
        });
      }
    });
    AsyncStorage.getItem('idLeague', (err, result) => {
        if (result !== null) {
            this.setState({
                idLeague: result
            }, () => this.getData());
        } else {
          this.getData();
        }
    });
  }

  getData() {
    this.setState({
      isLoading: true
    });

    fetch('http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/Controllers/fixtures.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idLeague: this.state.idLeague,
      })
    })
    .then((response) => response.json())
    .then((responseJsonFixtures) => {
      // console.log(responseJsonFixtures.currentMatchday);
      AsyncStorage.setItem('fixtures', JSON.stringify(responseJsonFixtures));
      AsyncStorage.getItem('idLeagueMyTeam', (errLeague, resultIDLeague) => {
        if (resultIDLeague !== null) {
          AsyncStorage.getItem('myTeam', (errTeam, resultIDTeam) => {
            if (resultIDTeam !== null) {
              fetch('http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/Controllers/getFixturesById.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  idLeague: resultIDLeague,
                  idTeam: resultIDTeam
                })
              })
              .then((response) => response.json())
              .then((responseJsonMyTeam) => {
                AsyncStorage.setItem(`myTeam${resultIDTeam}`, 
                  JSON.stringify(responseJsonMyTeam));
              })
              .catch((error) => {
                console.error(error);
                this.setState({
                  isLoading: false
                });
              });
            }
          });
        } else {
          fetch('http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/Controllers/getFixturesById.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              idLeague: '',
              idTeam: ''
            })
          })
            .then((response) => response.json())
            .then((responseJsonMyTeam) => {
              AsyncStorage.setItem(`myTeam${responseJsonMyTeam.team.id}`,
                JSON.stringify(responseJsonMyTeam));
              // this.setState({
              //   isLoading: false
              // });
            })
            .catch((error) => {
              console.error(error);
              this.setState({
                isLoading: false
              });
            });
        }
      });
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        isLoading: false
      });
    });

    fetch('http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/Controllers/getLeague.php', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJsonLeague) => {
      // console.log(responseJson);
      AsyncStorage.setItem('league', JSON.stringify(responseJsonLeague));
      fetch('http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/Controllers/upcomingFixtures.php', {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJsonUpcoming) => {
        // console.log(responseJsonUpcoming);
        AsyncStorage.setItem('upcoming', JSON.stringify(responseJsonUpcoming));
        fetch('http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/Controllers/getTables.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idLeague: this.state.idLeague,
          })
        })
        .then((response) => response.json())
        .then((responseJsonTables) => {
          // console.log(responseJson);
          AsyncStorage.setItem('tables', JSON.stringify(responseJsonTables));
          fetch('http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/Controllers/getTeams.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              idLeague: this.state.idLeague,
            })
          })
          .then((response) => response.json())
          .then((responseJsonTeams) => {
            // console.log(responseJson);
            AsyncStorage.setItem('teams', JSON.stringify(responseJsonTeams));
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
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            isLoading: false
          });
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          isLoading: false
        });
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
