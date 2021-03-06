import {timestamps, pagination} from './common';

const properties = {
  id: {type: 'string', nullable: false},
  title: {type: 'string'},
  description: {type: 'string'},
  startDate: {type: 'string'},
  finishDate: {type: 'string'},
  startAt: {type: 'string'},
  finishAt: {type: 'string'},
  imageUrl: {type: 'string'},
  link: {type: 'string'},
};

export const eventSchema = {
  type: 'object',
  properties: {
    ...timestamps,
    ...properties,
  },
};

export const paginatedEventSchema = {
  type: 'object',
  properties: {
    pages: pagination,
    data: {
      type: 'array',
      items: eventSchema,
    },
  },
};

export const eventInputSchema = {
  type: 'object',
  required: ['title', 'description', 'date'],
  properties,
};

export const eventSearchSchema = {
  type: 'object',
  properties: {
    id: {type: 'string', nullable: false},
    title: {type: 'string'},
  },
};
