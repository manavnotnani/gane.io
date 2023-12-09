import * as mongoose from 'mongoose';
import config from '../env/index';
import logger from '../../utils/logger';

const MONGO_URI: string = `${config.database.MONGODB_URI}`;

console.log("check",MONGO_URI );


export const db: mongoose.Connection = mongoose.createConnection(MONGO_URI);

// handlers
db.on('connecting', () => {
    logger.info('MongoDB :: connecting');
});

db.on('error', (error) => {
    logger.error(`MongoDB :: connection ${error}`);
    mongoose.disconnect();
});

db.on('connected', () => {
    logger.info('MongoDB :: connected');
});

db.once('open', () => {
    logger.info('MongoDB :: connection opened');
});

db.on('reconnected', () => {
    logger.warn('MongoDB :: reconnected');
});

db.on('reconnectFailed', () => {
    logger.error('MongoDB :: reconnectFailed');
});

db.on('disconnected', () => {
    logger.error('MongoDB :: disconnected');
});

db.on('fullsetup', () => {
    logger.info('MongoDB :: reconnecting... %d');
});
