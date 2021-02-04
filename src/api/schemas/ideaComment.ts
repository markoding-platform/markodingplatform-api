import {timestamps, pagination} from './common';

const properties = {
  id: {type: 'string'},
  comment: {type: 'string'},
  ideaId: {type: 'string'},
  userId: {type: 'string'},
};

const ideaCommentSchema = {
  type: 'object',
  properties: {
    ...timestamps,
    ...properties,
  },
};

export const paginatedIdeaCommentSchema = {
  type: 'object',
  properties: {
    pages: pagination,
    data: {
      type: 'array',
      items: ideaCommentSchema,
    },
  },
};
