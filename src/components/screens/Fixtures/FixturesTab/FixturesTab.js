import { TabNavigator } from 'react-navigation';
import FixturesScreen from './FixturesScreen';
import UpcomingScreen from './Upcoming';
import TabComponent from './TabComponent';

const FixturesTab = TabNavigator({
  Screen_Fixtures: {
    screen: FixturesScreen
  },
  Screen_Upcoming: {
    screen: UpcomingScreen
  }
},
{
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarComponent: TabComponent
});
export default FixturesTab;
