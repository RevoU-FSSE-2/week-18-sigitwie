import jwt from 'jsonwebtoken';
import { Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

const SECRET_KEY: string = process.env.JWT_SECRET;

class AuthService {
    
    // JWT-related operations
    static generateToken(payload: object, expiresIn = '1h'): string {
        return jwt.sign(payload, SECRET_KEY, { expiresIn });
    }

    static verifyToken(token: string): any {
        return jwt.verify(token, SECRET_KEY);
    }

    // Password-related operations
    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    static setTokenToCookies(res: Response, token: string): void {
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Set to secure if in production
            sameSite: 'strict',
            maxAge: 3600000  // 1 hour in milliseconds
        });
    }

    static issueTokensAndSetCookies(res: Response, user: User): string {
        const payload = {
            userId: user.id,
            username: user.username,
            roleId: user.roleId
        };
    
        const accessToken = AuthService.generateToken(payload);
        AuthService.setTokenToCookies(res, accessToken);
    
        return accessToken;
    }
    
}

export default AuthService;
