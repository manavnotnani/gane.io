import pino from 'pino';
import CONFIG from '../config/env';

const l = pino({
    name: CONFIG.project.name,
    level: CONFIG.project.logLevel,
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            levelKey: 'level', // --levelKey
            translateTime: 'yyyy-dd-mm, h:MM:ss TT',
            customColors: 'err:red,info:blue', // --customColors
            customLevels: 'err:99,info:1', // --customLevels
        },
    },
});

export default l;
