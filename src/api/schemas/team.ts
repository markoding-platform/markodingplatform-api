export const teamSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      createdAt: { type: "string" },
      updatedAt: { type: "string" },
      id: { type: "string", nullable: false },
      ideaId: { type: "string", nullable: false },
      userId: { type: "string", nullable: false },
      isLeader: { type: "boolean", nullable: false },
    },
  },
};

export const teamInputSchema = {
  type: "object",
  required: ["ideaId", "userIds"],
  properties: {
    ideaId: { type: "string" },
    userIds: {
      type: "array",
      maxItems: 2,
      items: { type: "string" },
    },
  },
};

export const addUserInputSchema = {
  type: "object",
  required: ["userId"],
  properties: {
    userId: { type: "string" },
  },
};
