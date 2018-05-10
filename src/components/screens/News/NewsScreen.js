import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { CachedImage } from 'react-native-cached-image';
import HeaderMenu from '../main/HeaderMenu';

const styles = require('../../styles/NewsStyle');

export default class NewsScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: (
      <HeaderMenu navigation={navigation} title='News' screen='Screen_News' />
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      isLoading: false,
    };
  }

  componentDidMount = () => {
    this.getNews();
  };

  getNews = () => {
    this.setState({
      isLoading: true,
    });
    fetch(`http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/Controllers/getNews.php?page=${ 
        this.state.page}`,
      {
        method: 'GET',
      }
    )
    .then(response => response.json())
    .then(responseJson => {
        console.log(responseJson);
      this.setState({
        data: [...this.state.data, ...responseJson],
        isLoading: false,
      });
    })
    .catch(error => {
      console.error(error);
      this.setState({
        isLoading: false,
      });
    });
  };

  cutString(stringTitle) {
    const stringCut = stringTitle.split(' ');
    return `${stringCut[0]} ${stringCut[1]} ${stringCut[2]} ...`;
  }

  loadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.getNews();
      }
    );
  };

  renderFooter = () => {
    if (!this.state.isLoading) return null;

    return (
      <View>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                this.props.navigation.navigate('Screen_SingleNews', {
                  id: item.id,
                  title: this.cutString(item.title),
                })}
            >
              <View style={styles.news}>
                <View style={styles.thumbnail}>
                  <CachedImage
                    style={styles.imgThumbnail}
                    source={{
                      uri: `http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/${ 
                        item.imgPost}`,
                    }}
                  />
                </View>
                <View style={styles.title}>
                  <Text style={styles.textTitle}>
                    {item.title}
                  </Text>
                </View>
                <View style={styles.datePost}>
                  <Text style={styles.textDatePost}>{item.datePost}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.loadMore}
          onEndReachedThreshold={-0.2}
        />
      </View>
    );
  }
}
