import { combineReducers } from 'redux';
import weatherReducer from './WeatherReducer';

const RootReducer = combineReducers({
  weather: weatherReducer,
});

export default RootReducer;
