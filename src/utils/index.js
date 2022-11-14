export const getSearchDateRange = (month) => {
  const lastDate = new Date(month[1], month[0], 0).getDate();

  return [
    {
      property: "date",
      date: {
        on_or_after: `${month[1]}-${month[0]}-01`,
      },
    },
    {
      property: "date",
      date: {
        on_or_before: `${month[1]}-${month[0]}-${lastDate}`,
      },
    },
  ];
};

export const getDayOfWeek = (date) => {
  const weekName = ["일", "월", "화", "수", "목", "금", "토"];
  const dateObject = new Date(date);

  return `${dateObject.getDate()}일 ${weekName[dateObject.getDay()]}요일`;
};
