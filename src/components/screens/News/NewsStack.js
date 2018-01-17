import { StackNavigator } from 'react-navigation';

import NewsScreen from './NewsScreen';
import SingleNewsScreen from './SingleNewsScreen';

const NewsStack = StackNavigator(
  {
    Screen_News: {
      screen: NewsScreen
    },
    Screen_SingleNews: {
      screen: SingleNewsScreen
    }
  }
);
export default NewsStack;
