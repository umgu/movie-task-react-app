function noOfPages(records, noRecordsPerPage) {
  let page = Math.floor(records / noRecordsPerPage);
  if (records % noRecordsPerPage !== 0) page++;
  return page;
}

function pagesForPage(data, currentPage, noOfPagesPerPage) {
  return data.slice(
    (currentPage - 1) * noOfPagesPerPage,
    currentPage * noOfPagesPerPage
  );
}

const utils = Object.freeze({ noOfPages, pagesForPage });

export default utils;
