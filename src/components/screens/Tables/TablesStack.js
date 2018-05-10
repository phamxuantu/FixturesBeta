import { StackNavigator } from 'react-navigation';

import TablesScreen from './TableScreen';
import SingleTeam from '../Teams/SingleTeamScreen';
import SettingScreen from '../main/SettingScreen';

const TablesStack = StackNavigator({
    Screen_Tables: {
        screen: TablesScreen
    },
    Screen_SingleTeam: {
        screen: SingleTeam
    },
    Screen_Setting: {
        screen: SettingScreen
    }
});
export default TablesStack;
