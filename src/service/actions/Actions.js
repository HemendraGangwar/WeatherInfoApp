import { FETCH_WEATHER_SUCCESS, WEATHER_FORECAST_FETCH } from "../types/Types";

export const startFetchData = (zipCode) => ({
    type: WEATHER_FORECAST_FETCH,
    zipCode,
  });
  export const fetchDataSuccess = (data) => ({
    type: FETCH_WEATHER_SUCCESS,
    data,
  });