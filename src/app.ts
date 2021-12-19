import config from 'config';
import express from 'express';
import routes from './routes';
import connect from './utils/connect';

const app = express();
const port = config.get<number>('port');

app.use(express.json());

app.listen(port, async () => {
  console.log(`Tasks back-end is running on port ${port}.`);
  await connect();
  routes(app);
});
