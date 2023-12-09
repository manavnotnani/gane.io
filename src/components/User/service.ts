import UserModel, { IUserModel } from './model';
import { IAuthService } from './interface';
import logger from '../../utils/logger';
import { RESPONSES, RES_MSG } from '../../utils/response';
import CustomError from '../../utils/customError';
import { PromiseResolve } from '../../utils/common.interface';

/**
 * @export
 * @implements {IAuthService}
 */
const AuthService: IAuthService = {

    /**
     * @param {any} params
     * @returns {Promise <PromiseResolve>}
     * @memberof AuthService
     */
    async searchUser(params: any): Promise<PromiseResolve> {
        try {
            const query: IUserModel = await UserModel.findOne(params).select('-password');
            if (!query) {
                throw new CustomError(RES_MSG.NO_DATA, RESPONSES.NOTFOUND);
            }

            return {
                status: RESPONSES.SUCCESS,
                error: false,
                message: RES_MSG.DATA_SUCCESS,
                data: query,
            };
        } catch (error) {
            return {
                status: error.status || RESPONSES.BADREQUEST,
                error: true,
                message: error.message || RES_MSG.BADREQUEST,
            };
        }
    },

    /**
     * @param {IUserModel} body
     * @returns {Promise <PromiseResolve>}
     * @memberof AuthService
     */
    async createUser(body: IUserModel): Promise<PromiseResolve> {
        try {
            const user: IUserModel = new UserModel({ email: body.email, password: body.password });
            const userCreated: IUserModel = await user.save();

            if (userCreated) {
                delete userCreated.password;

                return {
                    status: RESPONSES.SUCCESS,
                    error: false,
                    message: RES_MSG.SIGNUP_SUCCESS,
                    data: userCreated,
                };
            }
            throw new CustomError(RES_MSG.SMTHNG_WRNG, RESPONSES.INTERNALSERVER);
        } catch (error) {
            logger.error(error, 'User signup Error');

            return {
                status: error.status || RESPONSES.BADREQUEST,
                error: true,
                message: error.message || RES_MSG.SMTHNG_WRNG,
            };
        }
    },

    /**
     * @param {IUserModel} body
     * @returns {Promise <PromiseResolve>}
     * @memberof AuthService
     */
    async getUser(body: IUserModel): Promise<PromiseResolve> {
        try {
            const user: IUserModel = await UserModel.findOne({ email: body.email });

            const isMatched: boolean = user && await user.comparePassword(body.password);

            if (isMatched) {
                delete user.password;

                return {
                    status: RESPONSES.SUCCESS,
                    error: false,
                    message: RES_MSG.DATA_SUCCESS,
                    data: user,
                };
            }

            throw new CustomError(RES_MSG.INVALID_LOGIN, RESPONSES.NOTFOUND);
        } catch (error) {
            return {
                status: error.status || RESPONSES.INTERNALSERVER,
                error: true,
                message: error.message || RES_MSG.SMTHNG_WRNG,
            };
        }
    },
};

export default AuthService;
