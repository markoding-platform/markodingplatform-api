import {profileSchema} from './profile';
import {pagination} from './common';
import {eventSchema} from './event';

const properties = {
  name: {type: 'string'},
  email: {type: 'string'},
  skilvulPoint: {
    type: 'number',
    nullable: true,
  },
  markodingPoint: {
    type: 'number',
    nullable: true,
  },
  fcmToken: {type: 'string'},
  imageUrl: {type: 'string'},
};

export const userSchema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    ...properties,
  },
};

export const userInfoSchema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    name: {type: 'string'},
  },
};

export const userProfileSchema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    ...properties,
    profile: {
      nullable: true,
      ...profileSchema,
    },
  },
};

export const paginatedUserProfileSchema = {
  type: 'object',
  properties: {
    pages: pagination,
    data: {
      type: 'array',
      items: userProfileSchema,
    },
  },
};

export const userLeaderSchema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    name: {type: 'string'},
    imageUrl: {type: 'string'},
    skilvulPoint: {
      type: 'number',
      nullable: true,
    },
    markodingPoint: {
      type: 'number',
      nullable: true,
    },
  },
};
