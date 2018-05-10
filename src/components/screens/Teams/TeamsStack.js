import { StackNavigator } from 'react-navigation';

import TeamsScreen from './TeamsScreen';
import SingleTeam from './SingleTeamScreen';
import SettingScreen from '../main/SettingScreen';

const TeamsStack = StackNavigator({
    Screen_Teams: {
        screen: TeamsScreen
    },
    Screen_SingleTeam: {
        screen: SingleTeam
    },
    Screen_Setting: {
        screen: SettingScreen
    }
});
export default TeamsStack;
