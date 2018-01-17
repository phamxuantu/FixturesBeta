import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { CachedImage } from 'react-native-cached-image';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = require('../../styles/NewsStyle');

const MenuButton = props => (
  <TouchableOpacity
    onPress={() => {
      props.navigation.navigate('DrawerOpen');
    }}
  >
    <FontAwesome name="bars" size={30} style={{ marginLeft: 10 }} />
  </TouchableOpacity>
);

export default class NewsScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'News',
    headerLeft: <MenuButton navigation={navigation} />,
    headerStyle: { backgroundColor: '#00CC33' },
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
    fetch(`http://demo.tntechs.com.vn/xuantu/demo/Fixtures-Test/Controllers/getNews.php?page=${ 
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
                      uri: `http://demo.tntechs.com.vn/xuantu/demo/Fixtures-Test/${ 
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
