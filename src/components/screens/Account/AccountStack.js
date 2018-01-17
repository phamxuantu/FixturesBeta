import { StackNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen';

const AccountStack = StackNavigator({
  Screen_Login: {
    screen: LoginScreen
  }
});

export default AccountStack;
