import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../users/interface/users.interface';
@Injectable()
export class AuthService {
    mathpassword(password:string, encrypted:string):boolean {
        return bcrypt.compareSync(password, encrypted);
    }

    getToken(user: User): string {
        const userDB = user.toJSON();
        delete userDB.password; 
        return jwt.sign({ user: userDB }, process.env.SEED, { expiresIn: process.env.TOKEN_EXP });
    }

    verifyToken(token): string | object {
        return jwt.verify(token, process.env.SEED);
    }

}
