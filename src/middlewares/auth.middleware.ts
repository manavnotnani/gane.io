import { NextFunction, Request, Response } from 'express';
import { RESPONSES, RES_MSG } from '../utils/response';
import logger from '../utils/logger';
import AuthValidation from '../components/User/validation';
import { JoiValidationResult } from '../utils/common.interface';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise < any >}
 */
export async function validateSignup(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const requestedBody:any = req.body;
        const validateSignupResponse: JoiValidationResult = AuthValidation.createUser(requestedBody);

        if (validateSignupResponse.error) {
            throw new Error(validateSignupResponse.message);
        }

        req.body = validateSignupResponse.value;
        // Call next() only in the success case
        next();
    } catch (error) {
        logger.error(error, 'validateSignup error');

        return res.status(RESPONSES.BADREQUEST).send({
            status: RESPONSES.BADREQUEST,
            error: true,
            message: error.message || RES_MSG.BADREQUEST,
        });
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise < any >}
 */
export async function validateLogin(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const requestedBody:any = req.body;
        const validateLoginResponse: JoiValidationResult = AuthValidation.getUser(requestedBody);
        if (validateLoginResponse.error) {
            throw new Error(validateLoginResponse.message);
        }

        req.body = validateLoginResponse.value;
        // Call next() only in the success case
        next();
    } catch (error) {
        logger.error(error, 'validateLogin error');

        return res.status(RESPONSES.BADREQUEST).send({
            status: RESPONSES.BADREQUEST,
            error: true,
            message: error.message || RES_MSG.BADREQUEST,
        });
    }
}
