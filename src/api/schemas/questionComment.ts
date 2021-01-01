import { userSchema } from "./user";

const timestamps = {
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
};

const properties = {
  content: { type: "string" },
};

export const questionCommentSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    ...timestamps,
    ...properties,
    user: userSchema,
  },
};

export const questionCommentInputSchema = {
  type: "object",
  required: ["content", "question"],
  properties: {
    ...properties,
    question: { type: "string" },
  },
};
