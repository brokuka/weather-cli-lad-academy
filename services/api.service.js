import axios from "axios";
import { TOKEN_DICTIONARY } from "../utils/constants.js";
import { getKeyValue, saveKeyValue } from "./storage.service.js";
import { printError } from "./log.service.js";

export const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case "01":
      return "☀️";
    case "02":
      return "⛅";
    case "03":
      return "☁️";
    case "04":
      return "☁️";
    case "09":
      return "🌧️";
    case "10":
      return "🌦️";
    case "11":
      return "🌩️";
    case "13":
      return "❄️";
    case "50":
      return "🌫️";
  }
};

export const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  await saveKeyValue(TOKEN_DICTIONARY.city, city);

  if (!token) {
    return printError(
      "Не задан токен для API, открыть справочник можно по команде: node weather -h"
    );
  }

  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        lang: "ru",
        units: "metric",
      },
    }
  );

  return data;
};
