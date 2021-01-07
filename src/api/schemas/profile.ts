export const profileInputSchema = {
  type: 'object',
  required: ['profileType'],
  properties: {
    profileType: {
      type: 'string',
      enum: ['student', 'teacher', 'mentor', 'supporter'],
    },

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

export const profileSchema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    createdAt: {type: 'string'},
    updatedAt: {type: 'string'},
    deletedAt: {type: 'string'},

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
