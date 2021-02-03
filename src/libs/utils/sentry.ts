import fastifyPlugin from 'fastify-plugin';
import * as Sentry from '@sentry/node';

import pkg from '../../../package.json';

const {SENTRY_DSN, NODE_ENV} = process.env;

function sentryConnector(fastify, options, done) {
  console.log(NODE_ENV);
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: NODE_ENV,
    release: `${pkg.name}@${pkg.version}`,
  });
  fastify.addHook('onError', (req, reply, err, done) => {
    // Only send Sentry errors when not in development
    /* if (process.env.NODE_ENV !== 'development') {
      Sentry.captureException(error)
    } */
    Sentry.withScope((scope) => {
      scope.setUser({ip_address: req.raw.ip});
      scope.setTag('path', req.raw.url);
      Sentry.captureException(err);
      console.log(options);
      options.errorHandler
        ? options.errorHandler(err, req, reply)
        : reply.send({
            error: 500,
            message: 'Internal Server Error',
          });
    });
    done();
  });
  /* fastify.setErrorHandler((err, req, reply) => {
    Sentry.withScope(scope => {
      scope.setUser({ip_address: req.raw.ip});
      scope.setTag("path", req.raw.url);
      Sentry.captureException(err);
      console.log(options)
      options.errorHandler
        ? options.errorHandler(err, req, reply)
        : reply.send({
            error: 500,
            message: "Internal Server Error"
          });
    });
  }); */
  done();
}

export default fastifyPlugin(sentryConnector);
