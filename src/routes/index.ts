import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import AuthRouter from './UserRouter';
import config from '../config/env';
import { RESPONSES, RES_MSG } from '../utils/response';

const swaggerDef = require('../../swaggerDef');
// Define the rate limit options
const limiter:RateLimitRequestHandler = rateLimit({
    windowMs: config.rateLimit.maxTime, // 15 minutes
    max: config.rateLimit.maxRequest, // Max requests per windowMs
    standardHeaders: 'draft-7', // Specify the draft version for Retry-After header
    legacyHeaders: false,
    message: { status: RESPONSES.TOOMANYREQ, message: RES_MSG.TOO_MANY_REQ },
});
/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    // Apply the rate limiter to all routes or specific routes
    // app.use(limiter);
    /**
     * @description Forwards any requests to the /auth URI to our AuthRouter
     * @constructs
     */
    app.use('/auth', AuthRouter);

    /**
     * @description
     *  If swagger.json file exists in root folder, shows swagger api description
     *  else send commands, how to get swagger.json file
     * @constructs
     */
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc({
        swaggerDefinition: swaggerDef,
        apis: [path.join(__dirname, '../../src/**/**/*.ts')],
    })));

    /**
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req, res) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    /**
     * @constructs all routes
     */
    app.use(router);
}
