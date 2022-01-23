import { Express, Request, Response } from 'express';
import log from '../utils/logger';

function routes(app: Express) {
  /**
   * @openapi
   * /api/healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get('/api/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
  app.post('/api/logs', (req: Request, res: Response) => {
    type NgxLoggerType = {
      additional: string[];
      message: string;
      timestamp: Date;
      fileName: string;
      lineNumber: number;
      columnNumber: number;
    };
    const logMessage: NgxLoggerType = req.body;
    log.error(logMessage);
    res.sendStatus(200);
  });
}

export default routes;
