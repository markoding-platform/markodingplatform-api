import {timestamps} from './common';

const properties = {
  id: {type: 'string', nullable: true},
  name: {type: 'string'},
  pictureUrl: {type: 'string', format: 'uri'},
};
