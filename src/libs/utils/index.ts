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
  const {offset, limit} = queryString;
  const [rows, count] = rowsAndCount;

  const totalPages = Math.ceil(count / limit);
  let currentPage = offset / limit + 1;
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  return {
    data: rows,
    pages: {
      count,
      currentPage,
      totalPages,
    },
  };
}
