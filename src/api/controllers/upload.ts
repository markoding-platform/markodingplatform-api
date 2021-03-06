import {FastifyReply} from 'fastify';
import {Controller, POST} from 'fastify-decorators';
import {S3} from 'aws-sdk';

import {User} from '../entity';
import {UserService} from '../services';
import authenticate from '../hooks/onRequest/authentication';

const {AWS_ID, AWS_SECRET} = process.env;

const s3 = new S3({
  accessKeyId: AWS_ID,
  secretAccessKey: AWS_SECRET,
});

@Controller({route: '/uploads'})
export default class UploadController {
  constructor(private userService: UserService) {}

  @POST({
    url: '/',
    options: {
      onRequest: authenticate,
      schema: {
        querystring: {
          type: 'object',
          properties: {
            path: {type: 'string'},
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              url: {type: 'string'},
            },
          },
        },
      },
    },
  })
  async uploads(
    req: AuthenticatedRequest<{Querystring: {path: string}}>,
    reply: FastifyReply,
  ) {
    const user = req.user?.user as User;
    const u: User = new User();
    u.id = user.id;

    const userFound = await this.userService.getOne({id: user.id});
    if (!userFound) throw {statusCode: 400, message: 'User not found'};

    const data = await req.file({
      limits: {
        fileSize: 1 * 1024 * 1024,
        files: 1,
      },
    });

    const {path} = req.query;
    const pathEnum = ['banners', 'blogs', 'events', 'ideas'];
    if (pathEnum.indexOf(path) < 0) {
      throw {statusCode: 400, message: 'Invalid folder'};
    }

    const params = {
      Bucket: 'markodingplatform',
      Key: `${path}/` + new Date().getTime().toString() + data.filename,
      Body: data.file,
      ACL: 'public-read',
    };

    // @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const uploaded = await uploadS3(params);

    // @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return reply.code(201).send({url: uploaded.Location});
  }
}

function uploadS3(params) {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err: Error, data: S3.Types.ManagedUpload.SendData) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}
