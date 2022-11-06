import axios from "axios";

const axiosConfig = {
  method: "post",
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
    "Notion-Version": process.env.REACT_APP_NOTION_VERSION,
    "Content-Type": "application/json",
    "Database-Id": process.env.REACT_APP_DATABASE_ID,
  },
};

export const callApi = async ({ url, paramObject }) => {
  try {
    const { status, data } = await axios({
      ...axiosConfig,
      url: url,
      params: {
        data: JSON.stringify(paramObject),
      },
    });

    return { status, data };
  } catch (error) {
    console.log("### error => ", error);
    return { status: 500, data: {} };
  }
};
