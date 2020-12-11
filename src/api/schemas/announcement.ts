const timestamps = {
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
  deletedAt: { type: "string" },
};

const properties = {
  title: { type: "string" },
  subtitle: { type: "string" },
  datetime: { type: "string" },
  url: { type: "string" },
  userId: { type: "string" },
};

export const announcementSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    ...timestamps,
    ...properties,
  },
};

export const announcementInputSchema = {
  type: "object",
  properties,
};
