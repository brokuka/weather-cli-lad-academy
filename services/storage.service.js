import path from "path";
import { promises } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../weather-data.json");

export const saveKeyValue = async (key, value) => {
  let data = {};

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);

    data = JSON.parse(file);
  }

  data[key] = value;

  await promises.writeFile(filePath, JSON.stringify(data));
};

export const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);

    const data = JSON.parse(file);

    return data[key];
  }

  return undefined;
};

const isExist = async (path) => {
  try {
    await promises.stat(path);

    return true;
  } catch (error) {
    return false;
  }
};
