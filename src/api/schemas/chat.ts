import { userInfoSchema } from "./user";

const timestamps = {
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
};

const properties = {
  content: { type: "string" },
  type: { type: "string" },
};

export const chatSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    ...timestamps,
    ...properties,
    user: userInfoSchema,
  },
};

export const chatInputSchema = {
  type: "object",
  required: ["content", "type"],
  properties: {
    ...properties,
  },
};
