export const profileInputSchema = {
  type: 'object',
  required: ['profileType'],
  properties: {
    profileType: {
      type: 'string',
      enum: ['student', 'teacher', 'mentor', 'supporter'],
    },
    gender: {
      type: 'string',
      enum: ['perempuan', 'laki-laki'],
      nullable: true,
    },
    dateOfBirth: {
      type: 'string',
      nullable: true,
      format: 'date',
    },
    bio: {
      type: 'string',
      nullable: true,
    },
    telephone: {
      type: 'string',
      nullable: true,
      pattern: `^(0|\\+62|62)\\d{9,}`,
    },
    linkedinUrl: {
      type: 'string',
      nullable: true,
      format: 'uri',
    },
    instagramUrl: {
      type: 'string',
      nullable: true,
      format: 'uri',
    },
    profilePictureUrl: {
      type: 'string',
      nullable: true,
      format: 'uri',
    },

    schoolId: {
      type: 'string',
      nullable: true,
    },
    schoolName: {
      type: 'string',
      nullable: true,
    },
    schoolTypeId: {
      type: 'string',
      nullable: true,
    },
    schoolTypeName: {
      type: 'string',
      nullable: true,
    },
    schoolGradeId: {
      type: 'string',
      nullable: true,
    },
    schoolGradeName: {
      type: 'string',
      nullable: true,
    },
    classId: {
      type: 'string',
      nullable: true,
    },
    className: {
      type: 'string',
      nullable: true,
    },

    cityId: {
      type: 'string',
      nullable: true,
    },
    cityName: {
      type: 'string',
      nullable: true,
    },
    provinceId: {
      type: 'string',
      nullable: true,
    },
    provinceName: {
      type: 'string',
      nullable: true,
    },

    workingPosition: {
      type: 'string',
      nullable: true,
    },
    companyName: {
      type: 'string',
      nullable: true,
    },
    expertise: {
      type: 'string',
      nullable: true,
    },

    startTeachingYear: {
      type: 'number',
      nullable: true,
    },

    lastEducationGradeId: {
      type: 'string',
      nullable: true,
    },
    lastEducationGradeName: {
      type: 'string',
      nullable: true,
    },
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
    gender: {type: 'string'},
    dateOfBirth: {type: 'string'},
    bio: {type: 'string'},
    telephone: {type: 'string'},
    linkedinUrl: {type: 'string'},
    instagramUrl: {type: 'string'},
    profilePictureUrl: {type: 'string'},

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
