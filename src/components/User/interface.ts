import { PromiseResolve } from '../../utils/common.interface';
import { IUserModel } from './model';

/**
 * @export
 * @interaface IAuthService
 */
export interface IAuthService {
    /**
     * @param {any} params
     * @returns {Promise<PromiseResolve>}
     * @memberof AuthService
     */
    searchUser(params: any): Promise<PromiseResolve>;
    /**
     * @param {IUserModel} userModel
     * @returns {Promise<PromiseResolve>}
     * @memberof AuthService
     */
    createUser(userModel: IUserModel): Promise<PromiseResolve>;
    /**
     * @param {IUserModel} userModel
     * @returns {Promise<PromiseResolve>}
     * @memberof AuthService
     */
    getUser(userModel: IUserModel): Promise<PromiseResolve>;
}
