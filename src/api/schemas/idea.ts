const timestamps = {
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
};

const properties = {
  schoolId: { type: "string" },
  schoolName: { type: "string" },
  teacherId: { type: "string" },
  solutionName: { type: "string" },
  solutionType: { type: "string" },
  problemArea: { type: "string" },
  problemSelection: { type: "string" },
  problemReasoning: { type: "string" },
  solutionVision: { type: "string" },
  solutionMission: { type: "string" },
  solutionBenefit: { type: "string" },
  solutionObstacle: { type: "string" },
  solutionPitchUrl: { type: "string" },
  targetOutcomes: { type: "string" },
  targetCustomer: { type: "string" },
  potentialCollaboration: { type: "string" },
  solutionSupportingPhotos: { type: "array" },
  isDraft: { type: "boolean" },
};

export const ideaSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    ...timestamps,
    ...properties,
  },
};

export const ideaInputSchema = {
  type: "object",
  required: [
    "schoolId",
    "schoolName",
    "teacherId",
    "solutionName",
    "solutionType",
    "problemArea",
    "problemSelection",
    "problemReasoning",
    "solutionVision",
    "solutionMission",
    "solutionBenefit",
    "solutionObstacle",
    "targetOutcomes",
    "targetCustomer",
  ],
  properties,
};
