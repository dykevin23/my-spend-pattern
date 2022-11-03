import axios from "axios";

export const getExpenditureList = async () => {
  console.log(process.env.REACT_APP_TOKEN);

  const config = {
    method: "post",
    url: `/list`,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      "Notion-Version": process.env.REACT_APP_NOTION_VERSION,
      "Content-Type": "application/json",
      "Database-Id": process.env.REACT_APP_DATABASE_ID,
    },
    params: {
      data: JSON.stringify({
        data: {
          a: "1",
          b: "2",
        },
      }),
    },
    // data: { data: 1 },
  };
  const { data } = await axios(config);

  console.log(data);
  return data;
  // return await (
  //   await fetch("/list", { body: JSON.stringify({ data: 1 }) })
  // ).json();
};
