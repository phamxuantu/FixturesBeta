import { StackNavigator } from 'react-navigation';

import MyTeamScreen from './MyTeamScreen';
import SettingScreen from '../main/SettingScreen';

const MyTeamStack = StackNavigator({
    Screen_MyTeam: {
        screen: MyTeamScreen
    },
    Screen_Setting: {
        screen: SettingScreen
    }
});
export default MyTeamStack;
