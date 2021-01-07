export const timestamps = {
  createdAt: {type: 'string'},
  updatedAt: {type: 'string'},
};

export const queryParamId = {
  type: 'object',
  properties: {
    id: {type: 'string'},
  },
};

export const queryStringSkipLimit = {
  type: 'object',
  properties: {
    limit: {type: 'number'},
    offset: {type: 'number'},
  },
};
