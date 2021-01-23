import {ideaSchemaSearch} from './idea';
import {eventSchemaSearch} from './event';

export const searchSchema = {
  type: 'object',
  properties: {
    idea: {type: 'array', items: ideaSchemaSearch},
    events: {type: 'array', items: eventSchemaSearch},
  },
};
