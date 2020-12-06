export const teamSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      createdAt: { type: "string" },
      updatedAt: { type: "string" },
      deletedAt: { type: "string" },
      id: { type: "string", nullable: false },
      ideaId: { type: "string", nullable: false },
      userId: { type: "string", nullable: false },
      isLeader: { type: "boolean", nullable: false },
    },
  },
};

export const teamInputManySchema = {
  type: "object",
  required: ["ideaId", "leaderId", "userIds"],
  properties: {
    ideaId: { type: "string" },
    leaderId: { type: "string" },
    userIds: {
      type: "array",
      maxItems: 3,
      items: { type: "string" },
    },
  },
};

export const addUserInputSchema = {
  type: "object",
  required: ["userId", "isLeader"],
  properties: {
    userId: { type: "string" },
    isLeader: { type: "boolean" },
  },
};
