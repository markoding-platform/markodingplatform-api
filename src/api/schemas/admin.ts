const timestamps = {
  createdAt: {type: 'string'},
  updatedAt: {type: 'string'},
};

const properties = {
  name: {type: 'string'},
  email: {type: 'string'},
  role: {type: 'string'},
  password: {type: 'string'},
};

export const adminSchema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    ...timestamps,
    ...properties,
  },
};

export const adminInputSchema = {
  type: 'object',
  required: ['name', 'email', 'role', 'password'],
  properties,
};
