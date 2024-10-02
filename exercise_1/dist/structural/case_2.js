"use strict";
// External weather API
class ExternalWeatherAPI {
    fetchWeather(city) {
        // Simulating an API response
        return {
            location: city,
            temperature: 25,
            conditions: "Sunny",
            humidity: 60,
        };
    }
}
// Adapter
class WeatherAdapter {
    constructor() {
        this.externalWeatherAPI = new ExternalWeatherAPI();
    }
    getCurrentWeather(city) {
        const apiResponse = this.externalWeatherAPI.fetchWeather(city);
        return {
            city: apiResponse.location,
            temperature: apiResponse.temperature,
            conditions: apiResponse.conditions,
            humidity: apiResponse.humidity,
        };
    }
}
// Usage
function displayWeather(weatherService, city) {
    const weather = weatherService.getCurrentWeather(city);
    console.log(`Current weather in ${weather.city}:`);
    console.log(`Temperature: ${weather.temperature}°C`);
    console.log(`Conditions: ${weather.conditions}`);
    console.log(`Humidity: ${weather.humidity}%`);
}
const weatherAdapter = new WeatherAdapter();
displayWeather(weatherAdapter, "New York");
/*
Output:

Current weather in New York:
Temperature: 25°C
Conditions: Sunny
Humidity: 60%

----------------------------------------

Explanation:

The WeatherService interface defines the target interface that the client code expects.
The ExternalWeatherAPI class represents an external weather API that provides weather data in a different format.
The WeatherAdapter class acts as an adapter that adapts the ExternalWeatherAPI to the WeatherService interface.
The displayWeather function demonstrates the usage of the WeatherAdapter to display weather information for a given city.
This is an example of the Adapter design pattern, which allows incompatible interfaces to work together.

An adapter pattern is commonly used to bridge the gap between two incompatible interfaces by providing a wrapper that translates one interface into another.
*/
