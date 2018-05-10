import React, { Component } from 'react';
import { 
    Text, 
    View,
    FlatList, 
    ActivityIndicator,
    TouchableOpacity, 
    Platform,
    AsyncStorage
 } 
from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { CachedImage } from 'react-native-cached-image';


const styles = require('../../styles/SingleTeamStyle');

export default class SingleNewsScreen extends Component {

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
                <CachedImage 
                    resizeMode='center' 
                    source={{ uri: navigation.state.params.logo }} 
                    style={{
                        width: 30,
                        height: 30,
                        marginRight: 10
                    }}
                />
                <Text 
                    style={{
                        color: '#fff',
                        fontSize: 18
                    }}
                >
                    {navigation.state.params.nameTeam}
                </Text>
            </View>
        )
    });

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            isLoadding: false,
            idLeague: ''
        };
    }

    componentDidMount() {
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
        this.setState({ isLoadding: true });
        console.log('idTeam', this.props.navigation.state.params.id);
        console.log('idLeague', this.state.idLeague);
        fetch('http://103.28.38.10/~tngame/xuantu/demo/Fixtures-Test/Controllers/getTeamById.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idTeam: this.props.navigation.state.params.id,
                idLeague: this.state.idLeague
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log('check', responseJson);
                this.setState({ data: responseJson, isLoadding: false });
            })
            .catch(error => {
                console.error(error);
                this.setState({ isLoadding: false });
            });
    }

    textPosition(position) {
        if (position === 1) {
            return `${position} st`;
        } else if (position === 2) {
            return `${position} nd`;
        } else if (position === 3) {
            return `${position} rd`;
        }
        return `${position} th`;
    }

    renderItem = ({ item, index }) => {
        const { 
            header, 
            textName, 
            player, 
            infoTeam, 
            infoTable, 
            imgLogo, 
            name, 
            table, 
            textTable, 
            lable, 
            namePlayer, 
            textInfo, 
            infoPlayer, 
            logo } = styles;
        if (index === 0) {
            return (
                <View style={header}>
                    <View style={infoTeam}>
                        <View style={logo}>
                            <CachedImage 
                                resizeMode='center' 
                                style={imgLogo} 
                                source={{ uri: item.logo }} 
                            />
                        </View>
                        <Text style={name}>{item.nameTeam}</Text>
                        <Text style={name}>{item.leagueCaption}</Text>
                    </View>
                    <View style={infoTable}>
                        <View style={table}>
                            <Text style={textTable}>
                                {
                                    this.textPosition(item.position)
                                }
                            </Text>
                            <Text style={lable}>Position</Text>
                        </View>
                        <View style={table}>
                            <Text style={textTable}>{item.seasonRecord}</Text>
                            <Text style={lable}>All Season</Text>
                        </View>
                        <View style={table}>
                            <Text style={textTable}>{item.last10}</Text>
                            <Text style={lable}>Last 10</Text>
                        </View>
                    </View>
                </View>
            );
        }
        return (
            <View style={player}>
                <View style={namePlayer}>
                    <Text style={textInfo}>{item.jerseyNumber}</Text>
                    <Text style={textName}>{item.name}</Text>
                </View>
                <View style={infoPlayer}>
                    <Text style={textInfo}>{item.position}</Text>
                    <Text style={textInfo}>{item.dateOfBirth}</Text>
                    <Text style={textInfo}>{item.nationality}</Text>
                </View>
            </View>
        );
    }

    render() {
        const { container } = styles;
        return (
            <View style={container}>
                {this.state.isLoadding ? <ActivityIndicator /> : (
                    <FlatList 
                        data={this.state.data}
                        keyExtractor={item => item}
                        renderItem={this.renderItem}
                    />
                )}
            </View>
        );
    }
}
