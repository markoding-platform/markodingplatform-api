import {userSchema} from './user';
import {channelSchema} from './channel';
import {timestamps} from './common';

const properties = {
  content: {type: 'string'},
};

export const questionSchema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    ...timestamps,
    ...properties,
    comments: {type: 'number'},
    likes: {type: 'number'},
    channel: channelSchema,
    user: userSchema,
  },
};

export const questionPostSchema = {
  type: 'object',
  required: ['content', 'channel'],
  properties: {
    ...properties,
    channel: {type: 'string'},
  },
};

export const questionPutSchema = {
  type: 'object',
  required: ['content'],
  properties,
};
