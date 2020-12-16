const properties = {
  id: { type: "string", nullable: false },
  title: { type: "string" },
  description: { type: "string" },
  date: { type: "string" },
  startAt: { type: "string" },
  finishAt: { type: "string" },
};

export const eventSchema = {
  type: "object",
  properties,
};

export const eventInputSchema = {
  type: "object",
  required: ["title", "description", "date"],
  properties,
};
