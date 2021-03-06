import {timestamps, pagination} from './common';
import {userProfileSchema} from './user';

const properties = {
  id: {type: 'string'},
  comment: {type: 'string'},
  ideaId: {type: 'string'},
  userId: {type: 'string'},
  user: userProfileSchema,
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
