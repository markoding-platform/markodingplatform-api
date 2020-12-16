const timestamps = {
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
  deletedAt: { type: "string" },
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
  },
};

export const questionInputSchema = {
  type: "object",
  required: ["question", "channelId"],
  properties,
};
