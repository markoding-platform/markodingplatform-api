import {Controller, GET} from 'fastify-decorators';
import {CommonQueryString} from 'schemas';

import UserService from '../services/user';
import authenticate from '../hooks/onRequest/authentication';
import {User} from '../entity/user';
import {commonQueryString, commonParams} from '../schemas/common';
import {userProfileSchema} from '../schemas/user';

@Controller({route: '/users'})
export default class UserController {
  constructor(private service: UserService) {}

  @GET({
    url: '/teachers',
    options: {
      schema: {
        querystring: commonQueryString,
        response: {200: {type: 'array', items: userProfileSchema}},
      },
      onRequest: authenticate,
    },
  })
  async getUserTeachers(
    req: AuthenticatedRequest<{Querystring: CommonQueryString}>,
  ): Promise<User[]> {
    const userTeachers = await this.service.getUserTeacher(
      req.query.search,
      '',
      req.query.limit,
      req.query.skip,
    );

    return userTeachers;
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
      req.query.search,
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
        response: {200: {type: 'array', items: userProfileSchema}},
      },
      onRequest: authenticate,
    },
  })
  async getUserStudents(
    req: AuthenticatedRequest<{Querystring: CommonQueryString}>,
  ): Promise<User[]> {
    const userTeachers = await this.service.getUserStudent(
      req.query.search,
      '',
      req.query.limit,
      req.query.skip,
    );

    return userTeachers;
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
      req.query.search,
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
    const userTeachers = await this.service.getUserStudentNotInTeam(
      req.query.search,
      req.user.profile?.schoolId,
      req.query.limit,
      req.query.skip,
    );

    return userTeachers;
  }

  @GET({
    url: '/mentors',
    options: {
      schema: {
        querystring: commonQueryString,
        response: {200: {type: 'array', items: userProfileSchema}},
      },
      onRequest: authenticate,
    },
  })
  async getUserMentors(
    req: AuthenticatedRequest<{Querystring: CommonQueryString}>,
  ): Promise<User[]> {
    const userTeachers = await this.service.getUserMentor(
      req.query.search,
      '',
      req.query.limit,
      req.query.skip,
    );

    return userTeachers;
  }

  @GET({
    url: '/supporters',
    options: {
      schema: {
        querystring: commonQueryString,
        response: {200: {type: 'array', items: userProfileSchema}},
      },
      onRequest: authenticate,
    },
  })
  async getUserSupporters(
    req: AuthenticatedRequest<{Querystring: CommonQueryString}>,
  ): Promise<User[]> {
    const userTeachers = await this.service.getUserSupporter(
      req.query.search,
      '',
      req.query.limit,
      req.query.skip,
    );

    return userTeachers;
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
}
