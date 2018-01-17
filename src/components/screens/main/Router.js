import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import NewsStack from '../News/NewsStack';
import FixturesStack from '../Fixtures/FixturesStack';
import AccountStack from '../Account/AccountStack';
import TablesStack from '../Tables/TablesStack';
import TeamsStack from '../Teams/TeamsStack';
import MyTeamStack from '../MyTeam/MyTeamStack';
import Menu from './Menu';

const { width } = Dimensions.get('window');

export const SideMenu = DrawerNavigator({
    News: {
        screen: NewsStack
    },
    Fixtures: {
        screen: FixturesStack
    },
    Tables: {
        screen: TablesStack
    },
    Teams: {
        screen: TeamsStack
    },
    MyTeam: {
        screen: MyTeamStack
    },
    Account: {
        screen: AccountStack
    }
},
    {
        drawerWidth: (width / 4) * 3,
        contentComponent: props =>
            <ScrollView style={{ backgroundColor: '#fff' }}><Menu {...props} /></ScrollView>

    }
);
