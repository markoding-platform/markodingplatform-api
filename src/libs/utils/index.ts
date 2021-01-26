import {PaginatedResponse, QueryString} from '../types';

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
  queryString: QueryString,
  rowsAndCount: [Entity[], number],
): PaginatedResponse<Entity> {
  const {
    offset,
    limit,
    sort,
    keyword,
    solutionType,
    problemAreaId,
  } = queryString;
  const [rows, count] = rowsAndCount;

  const totalPages = Math.ceil(count / limit);
  let currentPage = offset / limit + 1;
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const keywordValue = keyword || '';
  const filters = {};
  if (solutionType) {
    const st: string[] = [];
    solutionType.split(',').forEach((s: string) => {
      st.push(s);
    });
    filters['solutionType'] = st;
  }
  if (problemAreaId) {
    const pa: string[] = [];
    problemAreaId.split(',').forEach((s: string) => {
      pa.push(s);
    });
    filters['problemAreaId'] = pa;
  }

  return {
    data: rows,
    pages: {
      count,
      currentPage,
      totalPages,
      params: {
        sorts: sort ? sort.split(',') : [],
        filters,
        keyword: keywordValue,
      },
    },
  };
}
