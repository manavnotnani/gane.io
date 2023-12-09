import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import helmet from 'helmet';
import { HttpError } from '../error/index';
import { sendHttpErrorModule } from '../error/sendHttpError';
import config from '../env/index';

/**
 * @export
 * @param {express.Application} app
 */
export function configure(app: express.Application): void {
    // express middleware
    app.use(bodyParser.urlencoded({
        extended: false,
    }));
    app.use(bodyParser.json());
    // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
    app.use(cookieParser());
    // returns the compression middleware
    app.use(compression());

    // helps you secure your Express apps by setting various HTTP headers
    app.use(helmet({
        contentSecurityPolicy: true, // Disable Helmet's CSP to use the manually configured one.
        hsts: {
            maxAge: 31536000, // One year in seconds
            includeSubDomains: true,
            preload: true,
        },
        referrerPolicy: { policy: 'same-origin' },
    }));
    // Define your CORS configuration
    const corsOptions = {
        origin: config.origin,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Include cookies or authorization headers
    };
    // providing a Connect/Express middleware that can be used to enable CORS with various options
    // app.use(cors(corsOptions));
    app.use(cors());

    // custom errors
    app.use(sendHttpErrorModule);

    // cors
    app.use((req, res, next) => {
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    });
}

interface CustomResponse extends express.Response {
    sendHttpError: (error: HttpError | Error, message ? : string) => void;
}

/**
 * @export
 * @param {express.Application} app
 */
export function initErrorHandler(app: express.Application): void {
    app.use((error: Error, req: express.Request, res: CustomResponse) => {
        if (typeof error === 'number') {
            error = new HttpError(error); // next(404)
        }

        if (error instanceof HttpError) {
            res.sendHttpError(error);
        } else if (app.get('env') === 'development') {
            error = new HttpError(500, error.message);
            res.sendHttpError(error);
        } else {
            error = new HttpError(500);
            res.sendHttpError(error, error.message);
        }
    });
}
