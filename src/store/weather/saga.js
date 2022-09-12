import { call, takeLatest, put } from "@redux-saga/core/effects";

import { 
  getWeatherData
 } from './weather.reducer';

 import { addAPISuccess } from './actions';

import * as Api from './services';

function* addAPI(payload) {
  let query = payload.query
  try {
    const response = yield call(Api.getList, query)
    yield put(getWeatherData(response))
  } catch (err) {
    
  }
}



export default function* listpageSaga() {
  yield takeLatest(LIST_API_SUBMIT, addAPI)
}