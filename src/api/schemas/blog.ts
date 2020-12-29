const timestamps = {
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
};

const properties = {
  id: { type: "string", nullable: false },
  title: { type: "string" },
  description: { type: "string" },
  imageUrl: { type: "string" },
};

export const blogSchema = {
  type: "object",
  properties: {
    ...properties,
    ...timestamps,
  },
};

export const blogInputSchema = {
  type: "object",
  required: ["title", "description", "date"],
  properties,
};
