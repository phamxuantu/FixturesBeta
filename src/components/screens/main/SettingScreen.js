import React, { Component } from 'react';
import { 
    View, 
    ActivityIndicator, 
    AsyncStorage, 
    Text, 
    FlatList, 
    TouchableOpacity,
    Platform,
    Dimensions
} from 'react-native';
import { CachedImage } from 'react-native-cached-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = require('../../styles/SettingStyle');

const { width } = Dimensions.get('window');

export default class SettingScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: (
            <View 
                style={{ 
                    backgroundColor: '#00CC33',
                    flexDirection: 'row', 
                    alignItems: 'center',
                    paddingLeft: 10,
                    height: Platform.OS === 'ios' ? 65 : 50,
                    paddingTop: Platform.OS === 'ios' ? 15 : 0 
                }}
            >
                <TouchableOpacity 
                    onPress={() => { navigation.goBack(); }} 
                    style={{
                        marginRight: 20
                    }}
                >
                    <FontAwesome name='arrow-left' size={20} />
                </TouchableOpacity>
                <Text 
                    style={{ 
                        color: '#000',
                        fontSize: 18,
                        fontWeight: 'bold',
                        width: ((7 * width) / 10) - 10,
                        textAlign: 'center'
                    }}
                >
                    Select League
                </Text>
            </View>
        )
    });

    constructor(props) {
        super(props);
        this.state = {
            dataLeague: '',
            isLoading: false,
            captionLeague: 'Premier League'
        };
    }

    componentDidMount() {
        this.getLeage();
    }

    getLeage() {
        this.setState({
            isLoading: true
        });
        AsyncStorage.getItem('league', (err, result) => {
            this.setState({
                dataLeague: JSON.parse(result),
                isLoading: false
            });
        });
        AsyncStorage.getItem('captionLeague', (err, result) => {
            if (result !== null) {
                this.setState({
                    captionLeague: result
                });
            }
        });
    }

    getData(idLeague) {
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
                idLeague
            })
        })
        .then((responseFixtures) => responseFixtures.json())
        .then((responseJsonFixtures) => {
            // console.log(responseJson);
            AsyncStorage.setItem('fixtures', JSON.stringify(responseJsonFixtures));
            fetch('http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/Controllers/getTables.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idLeague
                })
            })
            .then((responseTables) => responseTables.json())
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
                        idLeague
                    })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    // console.log(responseJson);
                    AsyncStorage.setItem('teams', JSON.stringify(responseJson));
                    this.setState({
                        isLoading: false
                    }, () => 
                        this.props.navigation.navigate(this.props.navigation.state.params.screen)
                    );
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

    showLeague() {
        const data = this.state.dataLeague;
        if (data !== '') {
            return (
                <FlatList 
                    data={this.state.dataLeague}
                    extraData={this.state}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity 
                            key={index}
                            style={styles.caption} 
                            onPress={() => {
                                this.setState({ captionLeague: item.caption });
                                AsyncStorage.setItem('captionLeague', item.caption);
                                AsyncStorage.setItem('idLeague', item.id.toString());
                                this.getData(item.id.toString());
                            }}
                        >
                            <View style={styles.logo}>
                                <CachedImage
                                resizeMode="center"
                                style={styles.imgLogo}
                                source={{ uri: item.logo }}
                                />
                            </View>
                            <Text 
                                style={
                                    item.caption.indexOf(this.state.captionLeague) !== -1 ?
                                    styles.leagueSelected : 
                                    styles.captionLeague
                                }
                            >
                                {item.caption}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            );
        }
    }

    render() {
        // console.log(this.props.navigation.state.params.screen);
        return (
            <View style={styles.container}>
                {this.state.isLoading ? <ActivityIndicator /> : this.showLeague()}
            </View>
        );
    }
}
