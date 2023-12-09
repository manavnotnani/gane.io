import * as bcrypt from 'bcrypt';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
import * as connections from '../../config/connection/connection';

export type AuthToken = {
    accessToken: string,
    kind: string,
};

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - email
 *        - name
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */
const UserSchema: Schema = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    password: String,
}, {
    collection: 'usermodel',
    versionKey: false,
});

UserSchema.pre('save', async function (next: NextFunction): Promise<void> {
    const user: IUserModel = this as IUserModel;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt: string = await bcrypt.genSalt(10);

        const hash: string = await bcrypt.hash(user.password, salt);

        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = async function (this: IUserModel, candidatePassword: string): Promise<boolean> {
    try {
        const match: boolean = await bcrypt.compare(candidatePassword, this.password);

        return match;
    } catch (error) {
        return error;
    }
};

export default connections.db.model<IUserModel>('UserModel', UserSchema);
