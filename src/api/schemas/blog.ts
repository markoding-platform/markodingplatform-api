import {timestamps, commonPagination} from './common';

const properties = {
  id: {type: 'string', nullable: false},
  title: {type: 'string'},
  description: {type: 'string'},
  imageUrl: {type: 'string'},
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
    pages: commonPagination,
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
