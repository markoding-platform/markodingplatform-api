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
    sort: {type: 'string'},
    keyword: {type: 'string', default: ''},
  },
};

export const pagination = {
  type: 'object',
  properties: {
    count: {type: 'number'},
    currentPage: {type: 'number'},
    totalPages: {type: 'number'},
    params: {
      type: 'object',
      properties: {
        sorts: {
          type: 'array',
          items: {type: 'string'},
        },
        filters: {
          type: 'object',
          properties: {
            solutionType: {type: 'array'},
            items: {type: 'string'},
          },
        },
        keyword: {type: 'string'},
      },
    },
  },
};
