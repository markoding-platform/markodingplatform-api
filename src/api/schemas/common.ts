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
    sort: {
      type: 'string',
      default: 'created_at',
      enum: ['created_at', 'solution_name', 'popularity'],
    },
    solutionType: {
      type: 'string',
      enum: ['Web', 'Mobile', 'Game'],
    },
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
