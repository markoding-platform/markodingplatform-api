export const authQuerySchema = {
  type: 'object',
  properties: {
    debug: {type: 'boolean'},
    id: {type: 'number'},
    email: {type: 'string'},
    isEmailVerified: {type: 'boolean'},
    name: {type: 'string'},
  },
};
