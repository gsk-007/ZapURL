import client from 'prom-client';
import express from 'express';

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.05, 0.1, 0.2, 0.5, 1, 2, 5]
});
register.registerMetric(httpRequestDuration);

const observeRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route?.path || req.path, code: res.statusCode });
  });
  next();
};

const metricsEndpoint = async (req: express.Request, res: express.Response) => {
  const metrics = await register.metrics()
  res.setHeader('Content-Type', register.contentType);
  res.end(metrics);
};

export { observeRequest, metricsEndpoint };
