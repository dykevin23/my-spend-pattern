import axios from "axios";

export const getExpenditureList = async () => {
  const config = {
    method: "post",
    url: `/list`,
    headers: {
      "Content-Type": "application/json",
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
