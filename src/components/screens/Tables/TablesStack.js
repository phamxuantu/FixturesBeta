import { StackNavigator } from 'react-navigation';

import TablesScreen from './TableScreen';
import SingleTeam from '../Teams/SingleTeamScreen';

const TablesStack = StackNavigator({
    Screen_Tables: {
        screen: TablesScreen
    },
    Screen_SingleTeam: {
        screen: SingleTeam
    }
});
export default TablesStack;
