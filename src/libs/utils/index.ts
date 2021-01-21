import {CommonQueryString, PaginatedResponse} from '../types';

export function validateDateInput(inputDate: Date): boolean {
  inputDate = new Date(inputDate);
  const now: Date = new Date();
  const date = inputDate.getDate();
  const month = inputDate.getMonth();
  const year = inputDate.getFullYear();

  if (
    date < now.getDate() ||
    month < now.getMonth() ||
    year < now.getFullYear()
  ) {
    return false;
  }

  return true;
}

export function paginateResponse<Entity>(
  queryString: CommonQueryString,
  rowsAndCount: [Entity[], number],
): PaginatedResponse<Entity> {
  const {offset, limit, sort, keyword} = queryString;
  const [rows, count] = rowsAndCount;

  console.log('loll');
  console.log(sort, keyword);

  const totalPages = Math.ceil(count / limit);
  let currentPage = offset / limit + 1;
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const sortValue = sort || '';
  const keywordValue = keyword || '';

  return {
    data: rows,
    pages: {
      count,
      currentPage,
      totalPages,
      params: {
        sorts: [sortValue],
        keyword: keywordValue,
      },
    },
  };
}
