const properties = {
  id: { type: "string", nullable: false },
  title: { type: "string" },
  description: { type: "string" },
  date: { type: "string" },
  startAt: { type: "string" },
  finishAt: { type: "string" },
  imageUrl: { type: "string" },
};

export const blogSchema = {
  type: "object",
  properties,
};

export const blogInputSchema = {
  type: "object",
  required: ["title", "description", "date"],
  properties,
};
