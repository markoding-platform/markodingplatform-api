import {userInfoSchema} from './user';
import {timestamps} from './common';

const properties = {
  content: {type: 'string'},
  type: {type: 'string'},
};

export const chatSchema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    ...timestamps,
    ...properties,
    user: userInfoSchema,
  },
};

export const chatInputSchema = {
  type: 'object',
  required: ['content', 'type'],
  properties: {
    ...properties,
  },
};
