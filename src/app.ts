import express from 'express';
import deserializeUser from './middlewares/deserializeUser';
import routes from './routes/routes';
import sessionRoutes from './routes/session.routes';
import userRoutes from './routes/user.routes';
import connect from './utils/connect';
import log from './utils/logger';
import swaggerDocs from './utils/swagger';

// const secrets: any = dotenv.config();
const app = express();
const port: number = Number(process.env.PORT) || 1337;

app.use(express.json());

app.use(deserializeUser);

app.listen(port, async () => {
  log.info(`Tasks back-end is running on port ${port}.`);
  // DB connection
  await connect();
  routes(app);
  userRoutes(app);
  sessionRoutes(app);
  swaggerDocs(app, port);
});
