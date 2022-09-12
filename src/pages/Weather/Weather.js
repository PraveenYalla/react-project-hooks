import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import SearchWeather from './SearchWeather';
import { getWeather } from '../../store/weather/services'
import WeatherData from './WeatherData';




const Weather = () => {


    const onSearch = () => {

    }

    const onSubmit = async (q) => {

        let getWeatherData = await getWeather(q)
            .then(res => res);


        console.log(getWeatherData);
    }



    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <CardTitle className="mb-4">Weather</CardTitle>
                    <SearchWeather onSubmit={onSubmit} ></SearchWeather>
                    <WeatherData  ></WeatherData>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}


export default Weather;