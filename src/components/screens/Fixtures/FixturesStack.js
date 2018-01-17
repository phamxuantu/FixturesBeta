import { StackNavigator } from 'react-navigation';

import FixturesScreen from './FixturesScreen';

const FixturesStack = StackNavigator({
  Screen_Fixtures: {
    screen: FixturesScreen
  }
});
export default FixturesStack;
