import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, POST } from "fastify-decorators";
import AWS from "aws-sdk";

const { AWS_ID, AWS_SECRET } = process.env;

const BUCKET_NAME = "markodingplatform";
const s3 = new AWS.S3({
  accessKeyId: AWS_ID,
  secretAccessKey: AWS_SECRET,
});

@Controller({ route: "/uploads" })
export default class UploadController {
  @POST({
    url: "/",
    options: {
      schema: {
        response: {
          200: { type: "object", properties: { url: { type: "string" } } },
        },
      },
    },
  })
  async uploads(req: FastifyRequest, reply: FastifyReply) {
    const data = await req.file();
    const params = {
      Bucket: BUCKET_NAME,
      Key: data.filename,
      Body: data.file,
      ACL: "public-read",
    };

    await s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      }

      reply.send({ url: data.Location });
    });

    return;
  }
}
