import {Controller, GET, PUT} from 'fastify-decorators';

import UserService from '../services/user';
import authenticate from '../hooks/onRequest/authentication';
import {User} from '../entity';
import {commonQueryString, commonParams} from '../schemas/common';
import {
  userSchema,
  userProfileSchema,
  userLeaderSchema,
  paginatedUserProfileSchema,
} from '../schemas/user';
import {CommonQueryString, PaginatedResponse} from '../../libs/types';
import {paginateResponse} from '../../libs/utils';

@Controller({route: '/users'})
export class UserController {
  constructor(private service: UserService) {}

  @GET({
    url: '/teachers',
    options: {
      schema: {
        querystring: commonQueryString,
        response: {200: paginatedUserProfileSchema},
      },
      onRequest: authenticate,
    },
  })
  async getUserTeachers(
    req: AuthenticatedRequest<{Querystring: CommonQueryString}>,
  ): Promise<PaginatedResponse<User>> {
    const response = await this.service.getUserTeacherPagination(
      req.query.keyword,
      '',
      req.query.limit,
      req.query.offset,
    );
    return paginateResponse(req.query, response);
  }

  @GET({
    url: '/my/teachers',
    options: {
      schema: {
        querystring: commonQueryString,
        response: {200: {type: 'array', items: userProfileSchema}},
      },
      onRequest: authenticate,
    },
  })
  async getUserMyTeachers(
    req: AuthenticatedRequest<{Querystring: CommonQueryString}>,
  ): Promise<User[]> {
    const userTeachers = await this.service.getUserTeacher(
      req.query.keyword,
      req.user.profile?.schoolId,
      req.query.limit,
      req.query.skip,
    );

    return userTeachers;
  }

  @GET({
    url: '/students',
    options: {
      schema: {
        querystring: commonQueryString,
        response: {200: paginatedUserProfileSchema},
      },
      onRequest: authenticate,
    },
  })
  async getUserStudents(
    req: AuthenticatedRequest<{Querystring: CommonQueryString}>,
  ): Promise<PaginatedResponse<User>> {
    const response = await this.service.getUserStudentPagination(
      req.query.keyword,
      '',
      req.query.limit,
      req.query.offset,
    );

    return paginateResponse(req.query, response);
  }

  @GET({
    url: '/my/students',
    options: {
      schema: {
        querystring: commonQueryString,
        response: {200: {type: 'array', items: userProfileSchema}},
      },
      onRequest: authenticate,
    },
  })
  async getUserMyStudent(
    req: AuthenticatedRequest<{Querystring: CommonQueryString}>,
  ): Promise<User[]> {
    const userTeachers = await this.service.getUserStudent(
      req.query.keyword,
      req.user.profile?.schoolId,
      req.query.limit,
      req.query.skip,
    );

    return userTeachers;
  }

  @GET({
    url: '/my/students/not-in-team',
    options: {
      schema: {
        querystring: commonQueryString,
        response: {200: {type: 'array', items: userProfileSchema}},
      },
      onRequest: authenticate,
    },
  })
  async getUserMyStudentsNotInTeam(
    req: AuthenticatedRequest<{Querystring: CommonQueryString}>,
  ): Promise<User[]> {
    const userTeachers = await this.service.getUserStudentNotInTeam({
      name: req.query.keyword,
      schoolId: req.user.profile?.schoolId,
      selfUserId: req.user.user.id,
      limit: req.query.limit,
      offset: req.query.skip,
    });

    return userTeachers;
  }

  @GET({
    url: '/mentors',
    options: {
      schema: {
        querystring: commonQueryString,
        response: {200: paginatedUserProfileSchema},
      },
      onRequest: authenticate,
    },
  })
  async getUserMentors(
    req: AuthenticatedRequest<{Querystring: CommonQueryString}>,
  ): Promise<PaginatedResponse<User>> {
    const response = await this.service.getUserMentorPagination(
      req.query.keyword,
      '',
      req.query.limit,
      req.query.offset,
    );

    return paginateResponse(req.query, response);
  }

  @GET({
    url: '/supporters',
    options: {
      schema: {
        querystring: commonQueryString,
        response: {200: paginatedUserProfileSchema},
      },
      onRequest: authenticate,
    },
  })
  async getUserSupporters(
    req: AuthenticatedRequest<{Querystring: CommonQueryString}>,
  ): Promise<PaginatedResponse<User>> {
    const response = await this.service.getUserSupporterPagination(
      req.query.keyword,
      '',
      req.query.limit,
      req.query.offset,
    );

    return paginateResponse(req.query, response);
  }

  @GET({
    url: '/detail/:id',
    options: {
      schema: {
        params: commonParams,
        response: {200: userProfileSchema},
      },
      onRequest: authenticate,
    },
  })
  async getUserDetail(
    req: AuthenticatedRequest<{Params: {id: string}}>,
  ): Promise<User | undefined> {
    const user = await this.service.getUserDetail(req.params.id);
    if (!user) throw {statusCode: 404, message: 'Data not found'};
    return user;
  }

  @PUT({
    url: '/skilvul-point',
    options: {
      schema: {
        params: commonParams,
        response: {200: userSchema},
      },
      onRequest: authenticate,
    },
  })
  async updateUserPoint(
    req: AuthenticatedRequest<{
      Body: {skilvulPoint: number};
    }>,
  ): Promise<User | undefined> {
    const user = await this.service.updateById(req.user.user.id, {
      skilvulPoint: req.body.skilvulPoint,
    });

    if (!user) throw {statusCode: 404, message: 'Data not found'};

    return user;
  }

  @GET({
    url: '/account',
    options: {
      schema: {
        response: {200: userSchema},
      },
      onRequest: authenticate,
    },
  })
  async getUserAccount(req: AuthenticatedRequest): Promise<User | undefined> {
    const user = await this.service.getOne({id: req.user.user.id});
    if (!user) throw {statusCode: 404, message: 'Data not found'};
    return user;
  }

  @PUT({
    url: '/image',
    options: {
      schema: {
        response: {200: userSchema},
      },
      onRequest: authenticate,
    },
  })
  async updateUserImage(
    req: AuthenticatedRequest<{
      Body: {imageUrl: string};
    }>,
  ): Promise<User | undefined> {
    const user = await this.service.updateById(req.user.user.id, {
      imageUrl: req.body.imageUrl,
    });
    if (!user) throw {statusCode: 404, message: 'Data not found'};
    return user;
  }

  @PUT({
    url: '/fcm-token',
    options: {
      schema: {
        response: {200: userSchema},
      },
      onRequest: authenticate,
    },
  })
  async updateUserFCMToken(
    req: AuthenticatedRequest<{
      Body: {fcmToken: string};
    }>,
  ): Promise<User | undefined> {
    const user = await this.service.updateById(req.user.user.id, {
      fcmToken: req.body.fcmToken,
    });
    if (!user) throw {statusCode: 404, message: 'Data not found'};
    return user;
  }
}

@Controller({route: '/leaderboards/user'})
export class LeaderboardUserController {
  constructor(private service: UserService) {}

  @GET({
    url: '/',
    options: {
      schema: {
        querystring: commonQueryString,
        response: {200: {type: 'array', items: userLeaderSchema}},
      },
    },
  })
  async getUserLeaders(): Promise<User[]> {
    const leaderUsers = await this.service.getUserLeader();
    return leaderUsers;
  }
}
