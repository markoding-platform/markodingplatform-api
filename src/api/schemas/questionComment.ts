import {timestamps} from './common';
import {userProfileSchema} from './user';

const properties = {
  content: {type: 'string'},
};

export const questionCommentSchema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    ...timestamps,
    ...properties,
    user: userProfileSchema,
  },
};

export const questionCommentInputSchema = {
  type: 'object',
  required: ['content', 'question'],
  properties: {
    ...properties,
    question: {type: 'string'},
  },
};
