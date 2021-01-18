export const timestamps = {
  createdAt: {type: 'string'},
  updatedAt: {type: 'string'},
};

export const commonParams = {
  type: 'object',
  properties: {
    id: {type: 'string'},
  },
};

export const commonQueryString = {
  type: 'object',
  properties: {
    limit: {type: 'number', default: 9},
    offset: {type: 'number', default: 0},
    search: {type: 'string'},
  },
};

export const commonPagination = {
  type: 'object',
  properties: {
    count: {type: 'number'},
    currentPage: {type: 'number'},
    totalPages: {type: 'number'},
  },
};
