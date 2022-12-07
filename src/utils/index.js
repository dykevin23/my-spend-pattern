export const getSearchDateRange = (month) => {
  console.log(month);
  const lastDate = new Date(month[1], month[0], 0).getDate();

  return [
    {
      property: "date",
      date: {
        on_or_after: `${month[1]}-${
          month[0] >= 10 ? month[0] : `0${month[0]}`
        }-01`,
      },
    },
    {
      property: "date",
      date: {
        on_or_before: `${month[1]}-${
          month[0] >= 10 ? month[0] : `0${month[0]}`
        }-${lastDate}`,
      },
    },
  ];
};

export const get3MonthRange = () => {
  const today = new Date();
  const to = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  };
  const lastDate = new Date(to.year, to.month, 0).getDate();
  const from = {
    year: to.month - 3 > 0 ? to.year : to.year - 1,
    month: to.month - 3 > 0 ? to.month - 3 + 1 : 12 - (to.month - 3) + 2,
  };

  return [
    {
      property: "date",
      date: {
        on_or_after: `${from.year}-${
          from.month >= 10 ? from.month : `0${from.month}`
        }-01`,
      },
    },
    {
      property: "date",
      date: {
        on_or_before: `${to.year}-${
          to.month >= 10 ? to.month : `0${to.month}`
        }-${lastDate}`,
      },
    },
  ];
};

export const getDayOfWeek = (date) => {
  const weekName = ["일", "월", "화", "수", "목", "금", "토"];
  const dateObject = new Date(date);

  return `${dateObject.getDate()}일 ${weekName[dateObject.getDay()]}요일`;
};

export const getCommonCodeValue = (list, code) => {
  return list.find((item) => item.code === code)?.value || "";
};
