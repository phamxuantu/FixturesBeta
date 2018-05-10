import { StackNavigator } from 'react-navigation';

import SettingScreen from '../main/SettingScreen';
import FixturesTab from './FixturesTab/FixturesTab';

const FixturesStack = StackNavigator({
  Tab_Fixtures: {
    screen: FixturesTab
  },
  Screen_Setting: {
    screen: SettingScreen
  }
});
export default FixturesStack;
