const properties = {
  name: { type: "string" },
  email: { type: "string" },
};

export const userSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    ...properties,
  },
};

export const userInfoSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
};
