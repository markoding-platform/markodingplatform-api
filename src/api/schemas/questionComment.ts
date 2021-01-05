import {userSchema} from './user';
import {timestamps} from './common';

const properties = {
  content: {type: 'string'},
};

export const questionCommentSchema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    ...timestamps,
    ...properties,
    user: userSchema,
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
