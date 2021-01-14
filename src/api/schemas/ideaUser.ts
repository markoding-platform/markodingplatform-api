import {timestamps} from './common';
import {userProfileSchema} from './user';
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
      user: userProfileSchema,
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
