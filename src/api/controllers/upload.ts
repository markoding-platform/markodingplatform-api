import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, POST } from "fastify-decorators";
import { S3 } from "aws-sdk";

const { AWS_ID, AWS_SECRET } = process.env;

const s3 = new S3({
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
    // await req.saveRequestFiles({ limits: { fileSize: 1 * 1024 * 1024 } })
    const data = await req.file({
      limits: {
        fileSize: 1 * 1024 * 1024,
        files: 1,
      },
    });

    const params = {
      Bucket: "markodingplatform",
      Key: data.filename,
      Body: data.file,
      ACL: "public-read",
    };

    s3.upload(
      params,
      function (err: Error, data: S3.Types.ManagedUpload.SendData) {
        if (err) {
          throw err;
        }

        return reply.send({ url: data.Location });
      }
    );
  }
}
