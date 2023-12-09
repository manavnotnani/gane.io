import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
    port: string | number;
    database: {
        MONGODB_URI: string;
        MONGODB_DB_MAIN: string;
    };
    secret: string;
    project: {
        name: string;
        logLevel: string;
    },
    grpc: {
        port: number;
        host: string;
    }
    origin: string;
    tokenExpire: string
    rateLimit:{
        maxRequest: number
        maxTime: number // TIME IN MILISECONDS
    }
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'users_db',
    },
    secret: process.env.SECRET || '@QEGTUI',
    project: {
        name: process.env.PROJECT_NAME,
        logLevel: process.env.LOG_LEVEL,
    },
    grpc: {
        port: Number(process.env.GRPC_CONTAINER_PORT),
        host: process.env.GRPC_CONTAINER_NAME,
    },
    origin: process.env.ALLOWED_ORIGIN,
    tokenExpire: process.env.TOKEN_EXPIRE || '60m',
    rateLimit: {
        maxRequest: Number(process.env.MAX_REQUEST) || 10,
        maxTime: Number(process.env.MAX_TIME) || 600000,
    },
};

const production: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://production_uri/',
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'users_db',
    },
    secret: process.env.SECRET || '@QEGTUI',
    project: {
        name: process.env.PROJECT_NAME,
        logLevel: process.env.LOG_LEVEL,
    },
    grpc: {
        port: Number(process.env.GRPC_CONTAINER_PORT),
        host: process.env.GRPC_CONTAINER_NAME,
    },
    origin: process.env.ALLOWED_ORIGIN,
    tokenExpire: process.env.TOKEN_EXPIRE || '60m',
    rateLimit: {
        maxRequest: Number(process.env.MAX_REQUEST) || 10,
        maxTime: Number(process.env.MAX_TIME) || 600000,
    },
};

const test: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
        MONGODB_DB_MAIN: 'test_users_db',
    },
    secret: process.env.SECRET || '@QEGTUI',
    project: {
        name: process.env.PROJECT_NAME,
        logLevel: process.env.LOG_LEVEL,
    },
    grpc: {
        port: Number(process.env.GRPC_CONTAINER_PORT),
        host: process.env.GRPC_CONTAINER_NAME,
    },
    origin: process.env.ALLOWED_ORIGIN,
    tokenExpire: process.env.TOKEN_EXPIRE || '60m',
    rateLimit: {
        maxRequest: Number(process.env.MAX_REQUEST) || 10,
        maxTime: Number(process.env.MAX_TIME) || 600000,
    },
};

const config: {
    [name: string]: IConfig
} = {
    test,
    development,
    production,
};

export default config[NODE_ENV];
