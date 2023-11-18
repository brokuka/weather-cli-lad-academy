import chalk from "chalk";
import dedent from "dedent-js";

export const printError = (error) => {
  console.log(`${chalk.bgRed(" E R R O R ")} ${error}`);
};

export const printSuccess = (message) => {
  console.log(
    dedent(`${chalk.bgGreen(" S U C C E S S ")} ${message}
	`)
  );
};

export const printHelp = () => {
  console.log(
    dedent(`${chalk.bgCyan(" H E L P ")}
		-h - вывод справочника
		-t <token> - установка токена
		-s <city> - установка города
	`)
  );
};

export const printWeather = (res, icon) => {
  console.log(
    dedent(`
		${chalk.bgYellow(" WEATHER ")} город ${res.name}
		Погода: ${icon}  ${res.weather[0].description}
		Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
		Влажность: ${res.main.humidity}%
		Скорость ветра: ${res.wind.speed}
	`)
  );
};
