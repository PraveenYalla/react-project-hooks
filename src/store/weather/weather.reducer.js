import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    loading:false,
    weatherData:[]
}

const Weather = createSlice({
    name:"Weather",
    initialState:initialState,
    reducers:{
        searchWeather:(state,action) => {
            state.loading = true
        },
        getWeatherData:(state,action) => {
            state.weatherData = action.payload
            state.loading = false
        }
    }
})

export const { searchWeather, getWeatherData } = Weather.actions;

export default Weather.reducer;