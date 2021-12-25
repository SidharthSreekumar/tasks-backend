import config from 'config';
import express from 'express';
import routes from './routes/routes';
import userRoutes from './routes/user.routes';
import connect from './utils/connect';
import swaggerDocs from './utils/swagger';

const app = express();
const port = config.get<number>('port');

app.use(express.json());

app.listen(port, async () => {
  console.log(`Tasks back-end is running on port ${port}.`);
  await connect();
  routes(app);
  userRoutes(app);
  swaggerDocs(app, port);
});
