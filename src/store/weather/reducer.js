// @flow
import {
  SEARCH_API
} from "./actionTypes"

const INIT_STATE = {
  loading: false,
  weatherData: [],
}

const Weather = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SEARCH_API:
      return {
        ...state,
        loading: true,
        weatherData: action.payload,
      }
    default:
      return state
  }
}

export default Weather
