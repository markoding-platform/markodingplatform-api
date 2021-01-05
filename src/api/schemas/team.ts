import { timestamps } from "./common";

export const teamSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      ...timestamps,
      id: { type: "string", nullable: false },
      ideaId: { type: "string", nullable: false },
      userId: { type: "string", nullable: false },
      isLeader: { type: "boolean", nullable: false },
    },
  },
};

export const teamInputSchema = {
  type: "object",
  required: ["userIds"],
  properties: {
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
