import { FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE, WEATHER_FORECAST_FETCH } from "../types/Types";

const initialState = {
  data: {},
  isFetching: false,
  error: null,
};

const WeatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case WEATHER_FORECAST_FETCH : {
      console.log('start Fetch');
      return {
        ...state,
        data: {},
        isFetching: true,
        error: null,
      };
    }
    case FETCH_WEATHER_SUCCESS : {
      console.log(action.data);
      return {
        ...state,
        data: action.data,
        isFetching: false,
        error: null,
      };
    }
    case FETCH_WEATHER_FAILURE : {
      return {
        ...state,
        data: {},
        isFetching: false,
        error: {},
      };
    }
    default: {
      return state;
    }
  }
};

export default WeatherReducer;
