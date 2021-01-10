import {Controller, GET} from 'fastify-decorators';
import {CommonQueryString} from 'schemas';

import UserService from '../services/user';
import authenticate from '../hooks/onRequest/authentication';
import {User} from '../entity/user';
import {commonQueryString} from '../schemas/common';
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
    url: '/my/students/available-for-idea',
    options: {
      schema: {
        querystring: commonQueryString,
        response: {200: {type: 'array', items: userProfileSchema}},
      },
      onRequest: authenticate,
    },
  })
  async getUserMyStudentAvailableForIdea(
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
}
