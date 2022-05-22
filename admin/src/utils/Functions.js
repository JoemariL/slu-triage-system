export const filterCampus = (campus, key) => {
  return campus.reduce(function (rv, data) {
    (rv[data[key]] = rv[data[key]] || []).push(data);
    return rv;
  }, {});
};

export const convertDateFormat = (value) => {
  const splitDate = value.split("-");
  return `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
};

export const extractSchoolList = (list) => {
  let tempArray = [];
  Object.keys(list).map((key) => {
    tempArray.push(key);
  });
  return tempArray;
};

export function getCurrentDate(separator = "-") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
}
