import {userSchema} from './user';
import {timestamps} from './common';

const properties = {
  isLike: {type: 'boolean'},
};

export const questionLikeSchema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    ...timestamps,
    ...properties,
    user: userSchema,
  },
};

export const questionLikeInputSchema = {
  type: 'object',
  required: ['isLike', 'question'],
  properties: {
    ...properties,
    question: {type: 'string'},
  },
};
