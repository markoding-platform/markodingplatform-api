import { userSchema } from "./user";

const timestamps = {
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
};

const properties = {
  isLike: { type: "boolean" },
};

export const questionLikeSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    ...timestamps,
    ...properties,
    user: userSchema,
  },
};

export const questionLikeInputSchema = {
  type: "object",
  required: ["isLike", "question"],
  question: { type: "string" },
  properties,
};
