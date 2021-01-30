type activityDetailType = {
  activity: string;
  point: number;
  rules?: {
    max: number;
    period: 'daily' | 'forever';
  };
};

type activityType = {
  [key: string]: activityDetailType;
};

export const activityPoints: activityType = {
  login: {
    activity: 'Login once per day',
    point: 10,
    rules: {
      max: 1,
      period: 'daily',
    },
  },
  qna: {
    activity: 'Post di Tanya Jawab',
    point: 2,
  },
  chat: {
    activity: 'Post di Chat',
    point: 2,
  },
  commentIdea: {
    activity: 'Comment di Ide Solusi',
    point: 2,
  },
  submitIdea: {
    activity: 'Submit Ide Solusi',
    point: 100,
    rules: {
      max: 1,
      period: 'forever',
    },
  },
  completeProfile: {
    activity: 'Melengkapi profil',
    point: 25,
    rules: {
      max: 1,
      period: 'forever',
    },
  },
  completeClass: {
    activity: 'Complete 1 kelas di Skilvul ',
    point: 50,
  },
};

export enum activityPointEnum {
  login = 'login',
  qna = 'qna',
  chat = 'chat',
  commentIdea = 'commentIdea',
  submitIdea = 'submitIdea',
  completeProfile = 'completeProfile',
  completeClass = 'completeClass',
}

export type activityPointType = keyof typeof activityPointEnum;
