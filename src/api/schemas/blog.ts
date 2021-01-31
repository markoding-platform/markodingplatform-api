import {timestamps, pagination} from './common';

const author = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    name: {type: 'string'},
  },
};

const properties = {
  id: {type: 'string', nullable: false},
  title: {type: 'string'},
  description: {type: 'string'},
  imageUrl: {type: 'string'},
  date: {type: 'string'},
  startAt: {type: 'string'},
  finishAt: {type: 'string'},
  author,
};

export const blogSchema = {
  type: 'object',
  properties: {
    ...properties,
    ...timestamps,
  },
};

export const paginatedBlogSchema = {
  type: 'object',
  properties: {
    pages: pagination,
    data: {
      type: 'array',
      items: blogSchema,
    },
  },
};

export const blogInputSchema = {
  type: 'object',
  required: ['title', 'description', 'date'],
  properties,
};

export const blogSearchSchema = {
  type: 'object',
  properties: {
    id: {type: 'string', nullable: false},
    title: {type: 'string'},
  },
};
