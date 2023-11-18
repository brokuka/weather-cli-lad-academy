#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getIcon, getWeather } from "./services/api.service.js";
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from "./services/log.service.js";
import { getKeyValue, saveKeyValue } from "./services/storage.service.js";
import { isEmpty } from "./utils/common.js";
import { TOKEN_DICTIONARY } from "./utils/constants.js";

const saveToken = async (token) => {
  if (!token.length) return printError("Токен не передан!");

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Токен сохранён!");
  } catch (error) {
    printError(error.message);
  }
};

const getForcast = async () => {
  try {
    const city = await getKeyValue(TOKEN_DICTIONARY.city);

    const weather = await getWeather(city);

    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (error) {
    if (error?.response?.status === 400) {
      return printError(
        "Не указан город, открыть справочник можно по команде: node weather -h"
      );
    }

    if (error?.response?.status === 401) {
      return printError("Неверно указан токен");
    }

    if (error?.response?.status === 404) {
      return printError("Неверно указан город");
    }

    return printError(error.message);
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }

  if (args.s) {
    return getWeather(args.s);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  if (isEmpty(args)) {
    return getForcast();
  } else
    return printError(
      "Не правильно указаны параметры! Используйте справочник: node weather -h"
    );
};

initCLI();
