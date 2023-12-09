import * as Joi from 'joi';
import Validation from '../validation';
import { IUserModel } from './model';
import * as joiOptions from '../../utils/joiError.filter';
import { JoiValidationResult } from '../../utils/common.interface';
import logger from '../../utils/logger';
import { RES_MSG } from '../../utils/response';

/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class AuthValidation extends Validation {
    /**
     * Creates an instance of AuthValidation.
     * @memberof AuthValidation
     */

    /**
     * @param {IUserModel} params
     * @returns {JoiValidationResult}
     * @memberof UserValidation
     */
    createUser(params: IUserModel): JoiValidationResult {
        try {
            const schema: Joi.Schema = Joi.object().keys({
                password: Joi.string().trim().required(),
                email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
            });

            const { error, value } = schema.validate(params, joiOptions.options);

            if (error) {
                return {
                    error: true,
                    value: '',
                    message: error.details[0].message,
                };
            }

            return {
                error: false,
                value,
            };
        } catch (error) {
            logger.error('createUser', 'createUser validation Error');

            return {
                error: true,
                value: '',
                message: RES_MSG.SMTHNG_WRNG,
            };
        }
    }

    /**
     * @param {IUserModel} params
     * @returns {JoiValidationResult}
     * @memberof UserValidation
     */
    getUser(params: IUserModel): JoiValidationResult {
        try {
            const schema: Joi.Schema = Joi.object().keys({
                password: Joi.string().trim().required(),
                email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
            });

            const { error, value } = schema.validate(params, joiOptions.options);

            if (error) {
                return {
                    error: true,
                    value: '',
                    message: error.details[0].message,
                };
            }

            return {
                error: false,
                value,
            };
        } catch (error) {
            logger.error('createUser', 'createUser validation Error');

            return {
                error: true,
                value: '',
                message: RES_MSG.SMTHNG_WRNG,
            };
        }
    }
}

export default new AuthValidation();
