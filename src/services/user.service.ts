import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '@config/database';

export class UserService {
    static async register(userData: { email: string; password: string }) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const [user] = await db('users').insert({ ...userData, password: hashedPassword }).returning('*');
        return user;
    }

    static async login(userData: { email: string; password: string }) {
        const user = await db('users').where({ email: userData.email }).first();
        if (!user || !(await bcrypt.compare(userData.password, user.password))) {
            throw new Error('Invalid email or password');
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        return token;
    }

    static async resetPassword(emailData: { email: string }) {
    }

    static async updatePassword(passwordData: { token: string; newPassword: string }) {
    }
}
