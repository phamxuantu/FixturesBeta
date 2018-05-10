import { StackNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ForgotPassScreen from './ForgotPassScreen';
import AuthenticPhoneScreen from './AuthenticPhoneScreen';
import CreatePassScreen from './CreatePass';
import UserInfoScreen from './UserInfoScreen';
import ChangePassScreen from './ChangePassScreen';

const AccountStack = StackNavigator({
  Screen_Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerLeft: null
    }
  },
  Screen_Register: {
    screen: RegisterScreen,
    navigationOptions: {
      headerLeft: null
    }
  },
  Screen_ForgotPass: {
    screen: ForgotPassScreen,
    navigationOptions: {
      headerLeft: null
    }
  },
  Screen_Authentic: {
    screen: AuthenticPhoneScreen,
    navigationOptions: {
      headerLeft: null
    }
  },
  Screen_CreatePass: {
    screen: CreatePassScreen,
    navigationOptions: {
      headerLeft: null
    }
  },
  Screen_InfoUser: {
    screen: UserInfoScreen,
    navigationOptions: {
      headerLeft: null
    }
  },
  Screen_ChangePass: {
    screen: ChangePassScreen,
    navigationOptions: {
      headerLeft: null
    }
  }
});

export default AccountStack;
