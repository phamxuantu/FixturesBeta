import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, AsyncStorage } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Picker from 'react-native-picker';
import { CachedImage } from 'react-native-cached-image';
import HeaderMenu from '../main/HeaderMenu';

const styles = require('../../styles/MyTeamStyle');

export default class MyTeamScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: (
      <HeaderMenu navigation={navigation} title='My Team' />
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      isLoading: false,
      idLeague: '',
      data: '',
      selected: this.getCurrentTime(),
      dates: [],
      time: [],
      arrnNameTeam: [],
      arrIdTeam: [],
      nameTeam: '',
      dataTeams: '',
      posSelected: 0
    };
    this.onDayPress = this.onDayPress.bind(this);
  }
  

  componentDidMount = () => {
    AsyncStorage.getItem('idLeague', (err, result) => {
      if (result !== null) {
          this.setState({
              idLeague: result
          }, () => this.getTeam());
      } else {
        this.getTeam();
      }
    });
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }

  getInfoTeam() {
    const dataFixtures = this.state.data;
    let result = null;
    if (dataFixtures !== '') {
      const info = dataFixtures.team;
      result = (
        <View style={styles.infoTeam}>
          <View style={styles.nameTeam}>
            <View style={styles.logoHeader}>
              <CachedImage 
                resizeMode='center' 
                style={styles.imgLogoHeader} 
                source={{ uri: info.logo }} 
              />
            </View>
            <Text style={styles.name}>{info.name}</Text>
            <TouchableOpacity onPress={() => this.picker()}>
              <View style={styles.btnChange}>
                <Text style={styles.txtChange}>Change</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.detailTeam}>
            <Text style={styles.detail}>Position: {info.position}</Text>
            <Text style={styles.detail}>Season record: {info.seasonRecord}</Text>
            <Text style={styles.detail}>Last 10: {info.last10}</Text>
            <Text style={styles.detail}>Goal Difference: {info.goalDifference}</Text>
          </View>
        </View>
      );
    }
    return result;
  }

  getFixtures(idTeam) {
    this.setState({
      isLoading: true
    });
    AsyncStorage.getItem(`myTeam${idTeam}`, (err, result) => {
      if (result !== null) {
        this.setState({
          data: JSON.parse(result),
          isLoading: false
        });
        AsyncStorage.setItem('myTeam', idTeam);
        this.filterDate();
      } else {
        fetch('http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/Controllers/getFixturesById.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idLeague: this.state.idLeague,
            idTeam
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          AsyncStorage.setItem(`myTeam${idTeam}`, JSON.stringify(responseJson));
          AsyncStorage.setItem('myTeam', idTeam);
          AsyncStorage.setItem('idLeagueMyTeam', this.state.idLeague);
          this.setState({
            data: responseJson,
            isLoading: false
          });
          this.filterDate();
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            isLoading: false
          });
        });
        }
      });
  }

  getNameTeam() {
    const dataTeams = this.state.dataTeams;
    // console.log('check team', dataTeams);
    if (dataTeams !== null) {
      // console.log('check team', dataTeams);
      const arrName = [];
      const arrId = [];
      for (let i = 0; i < dataTeams.length; i++) {
        arrName.push(dataTeams[i].name);
        arrId.push(dataTeams[i].id);
      }
      // console.log('check team', arrName);
      this.setState({
        arrnNameTeam: arrName,
        arrIdTeam: arrId,
      });
      // console.log('check team', this.state.arrIdTeam);
      AsyncStorage.getItem('myTeam', (err, result) => {
        if (result !== null) {
          for (let i = 0; i < arrId.length; i++) {
            if (result === arrId[i]) {
              this.setState({
                posSelected: i
              });
              break;
            }
          }
          this.getFixtures(result);
        } else {
          this.getFixtures(arrId[0]);
        }
      });
    }
  }

  getTeam() {
    this.setState({
      isLoading: true
    });
    AsyncStorage.getItem('teams', (err, result) => {
      this.setState({
        dataTeams: JSON.parse(result),
        isLoading: false
      });
      this.getNameTeam();
    });
  }

  getCurrentTime() {
    let today = new Date();
    today.setTime(
      today.getTime() + ((today.getTimezoneOffset() * 60 * 1000) + (7 * 60 * 60 * 1000))
    );
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    today = `${yyyy}-${mm}-${dd}`;
    return today;
  }

  showFixtures() {
    for (let position = 0; position < this.state.dates.length; position++) {
      if (this.state.selected === this.state.dates[position]) {
        const dataFixtures = this.state.data;
        if (dataFixtures !== '') {
          const fixtures = dataFixtures.fixtures;
          return (
            <View style={styles.fixtures}>
              <Text style={styles.date}>
                {fixtures[position].time}
              </Text>

              <Text style={styles.homeTeam}>
                {fixtures[position].shortHomeName}
              </Text>

              <View style={styles.logo}>
                <CachedImage 
                  resizeMode='center' 
                  style={styles.imgLogo} 
                  source={{ uri: fixtures[position].logoHome }} 
                />
              </View>

              <Text style={styles.result}>
                {fixtures[position].result.goalsHomeTeam} 
                - 
                {fixtures[position].result.goalsAwayTeam}
              </Text>

              <View style={styles.logo}>
                <CachedImage 
                  resizeMode='center' 
                  style={styles.imgLogo} 
                  source={{ uri: fixtures[position].logoAway }} 
                />
              </View>

              <Text style={styles.awayTeam}>
                {fixtures[position].shortAwayName}
              </Text>
            </View>
          );
        }
      }
    }
    return (
      <View style={styles.fixtures}><Text>No matches today</Text></View>
    );
  }

  checkMarkedDay(day) {
    // var dates = ['2017-11-20', '2017-11-01', '2017-11-15', '2017-11-25'];
    for (let i = 0; i < this.state.dates.length; i++) {
      if (day === this.state.dates[i]) {
        return true;
      }
    }
    return false;
  }

  markedDate = () => {
    // var dates = ['2017-11-20', '2017-11-01', '2017-11-15', '2017-11-25'];
    const datesMarked = {};
    for (let i = 0; i < this.state.dates.length; i++) {
      const todayString = this.getCurrentTime();
      const today = new Date(todayString);
      const date = new Date(this.state.dates[i]);
      if (date.getTime() > today.getTime()) {
        datesMarked[this.state.dates[i]] = { marked: true, dotColor: 'red' };
      } else {
        datesMarked[this.state.dates[i]] = { marked: true, dotColor: '#00CC33' };
      }
    }
    datesMarked[this.state.selected] = { 
      selected: true, 
      marked: this.checkMarkedDay(this.state.selected) 
    };
    return datesMarked;
  }

  cutHour(time) {
    return time.split(':')[0];
  }

  cutMinute(time) {
    return time.split(':')[1];
  }

  picker() {
    const data = this.state.arrnNameTeam;
    // console.log(data[2]);
    const selectedValue = [data[this.state.posSelected]];
    
    Picker.init({
        pickerData: data,
        selectedValue,
        pickerTitleText: 'Select Team',
        pickerConfirmBtnText: 'Select',
        pickerCancelBtnText: 'Cancel',
        pickerFontSize: 22,
        onPickerConfirm: (pickedValue, pickedIndex) => {
            this.getFixtures(this.state.arrIdTeam[pickedIndex]);
            this.setState({
              posSelected: pickedIndex
            });
            // for (let i = 0; i < this.state.time.length; i++) {
            //   let dateMatch = new Date(this.state.dates[i]);
            //   dateMatch.setHours(parseInt(this.cutHour(this.state.time[i]), 0));
            //   dateMatch.setMinutes(parseInt(this.cutMinute(this.state.time[i]), 0));
            //   let dateNoti = new Date(this.state.dates[i]);
            //   dateNoti.setHours(6);
            //   if()
            // }
        }
    });
    Picker.show();
  }

  filterDate() {
    const dataFixtures = this.state.data;
    // console.log('checkData', dataFixtures);
    const arrDate = [];
    const arrTime = [];
    if (dataFixtures !== '') {
      // console.log('checkData', dataFixtures.fixtures);
      const fixtures = dataFixtures.fixtures;
      for (let i = 0; i < fixtures.length; i++) {
        arrDate.push(fixtures[i].date);
        arrTime.push(fixtures[i].time);
      }
    }
    // console.log('date', arr);
    this.setState({
      dates: arrDate,
      time: arrTime
    });
  }

  render() {
    const { container, calendar, team } = styles;
    return (
      <View style={container}>
      {this.state.isLoading ? <ActivityIndicator /> : 
        <View style={{ flex: 1 }}>
          <View style={team}>
            {this.getInfoTeam()}
          </View>
          <Calendar
            onDayPress={this.onDayPress}
            style={calendar}
            hideExtraDays
            markedDates={this.markedDate()}
          />
          {this.showFixtures()}
        </View>
      }
      </View>
    );
  }
}
