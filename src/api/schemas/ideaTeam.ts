import {timestamps} from './common';
import {userSchema} from './user';
import {ideaSchema} from './idea';

export const teamSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      ...timestamps,
      id: {type: 'string', nullable: false},
      ideaId: {type: 'string', nullable: false},
      userId: {type: 'string', nullable: false},
      isLeader: {type: 'boolean', nullable: false},
      user: userSchema,
      idea: ideaSchema,
    },
  },
};

export const teamInputSchema = {
  type: 'object',
  required: ['userIds'],
  properties: {
    userIds: {
      type: 'array',
      maxItems: 2,
      items: {type: 'string'},
    },
  },
};

export const addUserInputSchema = {
  type: 'object',
  required: ['userId'],
  properties: {
    userId: {type: 'string'},
  },
};
