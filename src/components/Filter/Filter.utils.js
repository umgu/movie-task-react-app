function getYearList(startYear, lastYear = null) {
  if (lastYear === null) lastYear = new Date().getFullYear();
  const yearList = [];
  for (let y = lastYear; y >= startYear; y--) yearList.push(y);
  return yearList;
}

const utils = Object.freeze({ getYearList });

export default utils;
