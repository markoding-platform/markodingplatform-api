import {ideaSearchSchema} from './idea';
import {eventSearchSchema} from './event';

export const searchSchema = {
  type: 'object',
  properties: {
    ideas: {type: 'array', items: ideaSearchSchema},
    events: {type: 'array', items: eventSearchSchema},
  },
};
