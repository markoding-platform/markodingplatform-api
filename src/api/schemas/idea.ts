import {timestamps, commonPagination} from './common';

const properties = {
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
};

export const ideaSchema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    ...timestamps,
    ...properties,
    totalLikes: {type: 'number'},
    totalComments: {type: 'number'},
  },
};

export const paginatedIdeaSchema = {
  type: 'object',
  properties: {
    pages: commonPagination,
    data: {type: 'array', items: ideaSchema},
  },
};

export const ideaCommentSchema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
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
