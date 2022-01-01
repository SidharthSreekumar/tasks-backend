import mongoose from 'mongoose';
import logger from './logger';

async function connect() {
  const dbUri = process.env.DBURI || '';

  try {
    await mongoose.connect(dbUri);
    logger.info('DB connected');
  } catch (error) {
    logger.error('Could not connect to db');
    process.exit(1);
  }
}

export default connect;
