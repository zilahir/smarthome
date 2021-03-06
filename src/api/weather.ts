/* eslint-disable camelcase */
import axios, { AxiosResponse } from "axios";
import { WiDaySunny, WiCloudy } from "weather-icons-react";

interface Coord {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Clouds {
  all: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  sys: Sys;
  timezone: string;
  id: number;
  name: string;
  cod: number;
}

export interface ComposedWeather {
  icon: string;
  text: string;
}

export function createVerb(weatherData: Weather | undefined): ComposedWeather {
  const result = { icon: "", text: "" };
  if (weatherData && weatherData.main.toLowerCase() === "rain") {
    result.text = "raining";
    result.icon = WiDaySunny;
  } else if (weatherData && weatherData.main.toLowerCase() === "clouds") {
    result.text = "cloudy";
    result.icon = WiCloudy;
  }
  return result;
}

export const getWeatherData = (): Promise<WeatherData> =>
  new Promise((resolve) => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=Helsinki&appid=04b9eb1d8c5a27b96f2a06c0f6997bdf&units=metric"
      )
      .then((result: AxiosResponse) => {
        resolve(result.data);
      });
  });
