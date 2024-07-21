import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/database';

export class AuthService {
  static async register(userData: { username: string; password: string; email: string }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const [user] = await db('users').insert({ ...userData, password: hashedPassword }).returning('*');
    return user;
  }

  static async login(username: string, password: string) {
    const user = await db('users').where({ username }).first();
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      return { token, user };
    }
    throw new Error('Invalid credentials');
  }

  static async resetPassword(email: string, newPassword: string) {
    const user = await db('users').where({ email }).first();
    if (!user) throw new Error('User not found');
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db('users').where({ email }).update({ password: hashedPassword });
    return user;
  }
}
