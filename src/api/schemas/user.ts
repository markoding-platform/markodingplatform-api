import {profileSchema} from './profile';

const properties = {
  name: {type: 'string'},
  email: {type: 'string'},
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
