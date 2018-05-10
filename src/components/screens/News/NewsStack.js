import { StackNavigator } from 'react-navigation';

import NewsScreen from './NewsScreen';
import SingleNewsScreen from './SingleNewsScreen';
import SettingScreen from '../main/SettingScreen';

const NewsStack = StackNavigator(
  {
    Screen_News: {
      screen: NewsScreen
    },
    Screen_SingleNews: {
      screen: SingleNewsScreen
    },
    Screen_Setting: {
      screen: SettingScreen
    }
  }
);
export default NewsStack;
