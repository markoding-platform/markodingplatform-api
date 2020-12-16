import { userSchema } from "./user";

const timestamps = {
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
};

const properties = {
  question: { type: "string" },
  channelId: { type: "string" },
};

export const questionSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    ...timestamps,
    ...properties,
    user: userSchema,
  },
};

export const questionInputSchema = {
  type: "object",
  required: ["question", "channelId"],
  properties,
};
