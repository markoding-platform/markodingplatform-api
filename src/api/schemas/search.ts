import {ideaSearchSchema} from './idea';
import {eventSearchSchema} from './event';
import {blogSearchSchema} from './blog';

export const searchSchema = {
  type: 'object',
  properties: {
    ideas: {type: 'array', items: ideaSearchSchema},
    events: {type: 'array', items: eventSearchSchema},
    blogs: {type: 'array', items: blogSearchSchema},
  },
};
