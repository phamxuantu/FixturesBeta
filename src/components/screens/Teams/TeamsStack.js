import { StackNavigator } from 'react-navigation';

import TeamsScreen from './TeamsScreen';
import SingleTeam from './SingleTeamScreen';

const TeamsStack = StackNavigator({
    Screen_Teams: {
        screen: TeamsScreen
    },
    Screen_SingleTeam: {
        screen: SingleTeam
    }
});
export default TeamsStack;
