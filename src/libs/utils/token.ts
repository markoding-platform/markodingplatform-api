import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export function verifyToken(token: string): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET as string, function (err, decoded) {
      if (err) {
        return reject({ statusCode: 400, message: "malformed token!" });
      }

      if (!decoded) {
        return reject({
          statusCode: 500,
          message: "internal server error | decoded null",
        });
      }

      return resolve(decoded as Record<string, unknown>);
    });
  });
}
