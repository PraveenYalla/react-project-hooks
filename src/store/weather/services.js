function getWeather(q) {
    return fetch(`http://api.weatherapi.com/v1/current.json?key=13e32340e13a49e0a78113203212805&q=${q}&aqi=no`)
            .then(res => res.json())
            .catch(err => err);
}

export { getWeather };