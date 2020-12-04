export const teamSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
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
