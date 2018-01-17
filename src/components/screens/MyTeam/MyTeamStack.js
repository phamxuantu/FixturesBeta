import { StackNavigator } from 'react-navigation';

import MyTeamScreen from './MyTeamScreen';

const MyTeamStack = StackNavigator({
    Screen_MyTeam: {
        screen: MyTeamScreen
    }
});
export default MyTeamStack;
