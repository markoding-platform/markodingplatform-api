import {timestamps, pagination, commonQueryString} from './common';

const properties = {
  id: {type: 'string'},
  schoolId: {type: 'string'},
  status: {type: 'string'},
  schoolName: {type: 'string'},
  solutionName: {type: 'string'},
  solutionType: {type: 'string'},
  problemArea: {type: 'string'},
  problemSelection: {type: 'string'},
  problemReasoning: {type: 'string'},
  solutionVision: {type: 'string'},
  solutionMission: {type: 'string'},
  solutionBenefit: {type: 'string'},
  solutionObstacle: {type: 'string'},
  solutionPitchUrl: {type: 'string'},
  targetOutcomes: {type: 'string'},
  targetCustomer: {type: 'string'},
  potentialCollaboration: {type: 'string'},
  solutionSupportingPhotos: {type: 'array'},
  isDraft: {type: 'boolean'},
  liked: {type: 'number'},
};

export const ideaSchema = {
  type: 'object',
  properties: {
    ...timestamps,
    ...properties,
    totalLikes: {type: 'number'},
    totalComments: {type: 'number'},
  },
};

export const paginatedIdeaSchema = {
  type: 'object',
  properties: {
    pages: pagination,
    data: {
      type: 'array',
      items: ideaSchema,
    },
  },
};

export const ideaCommentSchema = {
  type: 'object',
  properties: {
    ...timestamps,
    ...properties,
    comments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {type: 'string'},
          comment: {type: 'string'},
        },
      },
    },
    totalLikes: {type: 'number'},
    totalComments: {type: 'number'},
  },
};

export const ideaInputSchema = {
  type: 'object',
  required: [
    'schoolId',
    'schoolName',
    'solutionName',
    'solutionType',
    'problemArea',
    'problemSelection',
    'problemReasoning',
    'solutionVision',
    'solutionMission',
    'solutionBenefit',
    'solutionObstacle',
    'targetOutcomes',
    'targetCustomer',
  ],
  additionalProperties: false,
  properties,
};

export const ideaQueryStringSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    ...commonQueryString.properties,
    solutionType: {type: 'string'},
  },
};
