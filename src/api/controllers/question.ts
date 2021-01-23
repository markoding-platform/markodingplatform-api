import camelcaseKeys from 'camelcase-keys';
import {FastifyRequest} from 'fastify';
import {Controller, GET, POST, PUT} from 'fastify-decorators';

import QuestionService from '../services/question';
import {Question, QuestionInput, User} from '../entity';
import {
  questionSchema,
  questionPostSchema,
  questionPutSchema,
  paginatedQuestionSchema,
} from '../schemas/question';
import authenticate from '../hooks/onRequest/authentication';
import {commonParams, commonQueryString} from '../schemas/common';
import {PaginatedResponse} from '../../libs/types';
import {paginateResponse} from '../../libs/utils';

@Controller({route: '/questions'})
export default class QuestionController {
  constructor(private service: QuestionService) {}

  @GET({
    url: '/',
    options: {
      schema: {
        response: {200: {type: 'array', items: questionSchema}},
      },
    },
  })
  async get(): Promise<Question[]> {
    return await this.service.getLatest();
  }

  @GET({
    url: '/channel/:id',
    options: {
      schema: {
        params: commonParams,
        querystring: commonQueryString,
        response: {200: paginatedQuestionSchema},
      },
    },
  })
  async getByChannel(
    req: FastifyRequest<{
      Params: {id: string};
      Querystring: {limit: number; offset: number; keyword: string};
    }>,
  ): Promise<PaginatedResponse<Question>> {
    const {limit, offset, keyword} = req.query;
    const {id} = req.params;
    const response = await this.service.getByChannel(
      id,
      limit,
      offset,
      keyword,
    );
    return paginateResponse({limit, offset}, response);
  }

  @GET({
    url: '/:id',
    options: {
      schema: {
        params: commonParams,
        response: {200: questionSchema},
      },
    },
  })
  async getById(
    req: FastifyRequest<{Params: {id: string}}>,
  ): Promise<Question> {
    const question = await this.service.getById(req.params.id);
    if (!question) throw {statusCode: 404, message: 'Entity not found'};

    return question;
  }

  @POST({
    url: '/',
    options: {
      schema: {
        body: questionPostSchema,
        response: {200: questionSchema},
      },
      onRequest: authenticate,
    },
  })
  async create(
    req: AuthenticatedRequest<{
      Body: QuestionInput;
      User: Record<string, unknown>;
    }>,
  ): Promise<Question> {
    const user = req.user?.user as User;
    const data = req.body;
    data.user = user;
    return this.service.store(data);
  }

  @PUT({
    url: '/:id',
    options: {
      schema: {
        params: commonParams,
        body: questionPutSchema,
        response: {200: questionSchema},
      },
      onRequest: authenticate,
    },
  })
  async update(
    req: AuthenticatedRequest<{
      Params: {id: string};
      Body: QuestionInput;
      User: Record<string, unknown>;
    }>,
  ): Promise<Question> {
    const user = req.user?.user as User;
    const updated = await this.service.update(req.params.id, req.body, user);
    if (!updated) throw {statusCode: 404, message: 'Entity not found'};

    return camelcaseKeys(updated, {deep: true});
  }
}
