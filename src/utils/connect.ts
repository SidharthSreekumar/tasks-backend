import mongoose from 'mongoose';
import logger from './logger';

async function connect() {
  const dbUri = process.env.DBURI || '';
    logger.info('DB connected');
  if (!dbUri) {
    logger.error('Could not get DB connection URL')
    process.exit(1);
  }
  try {
    await mongoose.connect(dbUri);
    logger.info('DB connected');
  } catch (error) {
    logger.error('Could not connect to db');
    process.exit(1);
  }
}

export default connect;
