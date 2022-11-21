import { TYPES } from "data/enums";
import * as Enums from "data/enums";
console.log(Object.keys(Enums));

export const settingProperties = (properties) => {
  const keys = Object.keys(properties);
  let result = {};
  keys
    .filter((key) => key !== "key")
    .forEach((key) => {
      const { type } = properties[key];
      const value = getValueByPropertyTypes(type, properties[key][type]);
      if (Object.keys(Enums).includes(key.toUpperCase())) {
        const codeObject = Enums[key.toUpperCase()].find(
          (item) => item.value === value
        );
        result[key] = codeObject?.code || value;
      } else {
        result[key] = value;
      }
    });

  return result;
};

const getValueByPropertyTypes = (type, data) => {
  // console.log(type, data);
  switch (type) {
    case TYPES.select:
      return data?.name;
    case TYPES.date:
      return data?.start;
    case TYPES.title:
      return data[0]?.plain_text;
    case TYPES.rich_text:
      return data[0]?.plain_text;
    default:
      return data;
  }
};
