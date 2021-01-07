export const authQuerySchema = {
  type: 'object',
  properties: {
    debug: {type: 'boolean'},
    id: {type: 'number'},
    email: {type: 'string'},
    isEmailVerified: {type: 'boolean'},
    name: {type: 'string'},
  },
};

const userAuthSchema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    name: {type: 'string'},
    externalId: {type: 'number'},
    isEmailVerified: {type: 'boolean'},
  },
};

const profileAuthSchema = {
  type: 'object',
  nullable: true,
  properties: {
    id: {type: 'string'},
    profileType: {type: 'string'},
    schoolId: {type: 'string'},
    schoolName: {type: 'string'},
    schoolTypeId: {type: 'string'},
    schoolTypeName: {type: 'string'},
    schoolGradeId: {type: 'string'},
    schoolGradeName: {type: 'string'},
    classId: {type: 'string'},
    className: {type: 'string'},
    cityId: {type: 'string'},
    cityName: {type: 'string'},
    provinceId: {type: 'string'},
    provinceName: {type: 'string'},
    workingPosition: {type: 'string'},
    companyName: {type: 'string'},
    expertise: {type: 'string'},
    startTeachingYear: {type: 'number'},
    lastEducationGradeId: {type: 'string'},
    lastEducationGradeName: {type: 'string'},
  },
};

export const authResponseSchema = {
  type: 'object',
  properties: {
    token: {type: 'string'},
    data: {
      type: 'object',
      properties: {
        user: {...userAuthSchema},
        profile: {...profileAuthSchema},
      },
    },
  },
};
