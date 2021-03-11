import { takeLatest, put, call, take } from 'redux-saga/effects';
import { fetchDataSuccess } from '../actions/Actions';
import { fetchWeather } from '../api/AsyncAPI';
import { WEATHER_FORECAST_FETCH } from "../types/Types";


function* getAPIData(zipCode) {
   
    const data = yield call(fetchWeather, zipCode);
    yield put(fetchDataSuccess(data));
    saveResponseToStorage(data, zipCode)
    console.log("response === " + data);

}


export default function* rootSaga() {
    yield takeLatest(WEATHER_FORECAST_FETCH, getAPIData);
}
