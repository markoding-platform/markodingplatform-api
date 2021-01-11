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
    limit: {type: 'number'},
    offset: {type: 'number'},
    search: {type: 'string'},
  },
};
