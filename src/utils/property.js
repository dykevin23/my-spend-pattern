import { Types } from "../data/enums";

export const settingProperties = (properties) => {
  const keys = Object.keys(properties);
  let result = {};
  keys
    .filter((key) => key !== "key")
    .forEach((key) => {
      const { type } = properties[key];
      result[key] = getValueByPropertyTypes(type, properties[key][type]);
    });

  return result;
};

const getValueByPropertyTypes = (type, data) => {
  // console.log(type, data);
  switch (type) {
    case Types.select:
      return data?.name;
    case Types.date:
      return data?.start;
    case Types.title:
      return data[0]?.plain_text;
    case Types.rich_text:
      return data[0]?.plain_text;
    default:
      return data;
  }
};
