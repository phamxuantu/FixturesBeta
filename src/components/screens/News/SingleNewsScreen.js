import React, { Component } from 'react';
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';

const styles = require('../../styles/SingleNewsStyle');

export default class SingleNewsScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerStyle: { backgroundColor: '#00CC33' }
  });

  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
  }

  componentDidMount = () => {
    fetch('http://demo.tntechs.com.vn/xuantu/demo/Fixtures-Test/Controllers/getNewsById.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.props.navigation.state.params.id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ data: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (<View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.thumbnail}>
            <Image style={styles.imgThumbnail} source={{ uri: `http://demo.tntechs.com.vn/xuantu/demo/Fixtures-Test/${this.state.data.imgPost}` }} />
            </View>

            <View style={styles.title}>
              <Text style={styles.textTitle}>
                {this.state.data.title}
              </Text>
            </View>

            <View style={styles.datePost}>
              <Text>
                {this.state.data.datePost}
              </Text>
            </View>
          </View>

          <View style={styles.line} />

          <View style={styles.content}>
            <View>
              {/* <Text>{this.props.navigation.state.params.id}</Text> */}
              <HTMLView value={this.state.data.content} stylesheet={stylesHTML} />
            </View>
          </View>
        </ScrollView>
      </View>);
  }
}


const stylesHTML = StyleSheet.create({
  span: {
    textAlign: 'center',
    color: '#3366ff'
  }
});
