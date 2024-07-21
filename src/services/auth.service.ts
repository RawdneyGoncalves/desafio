import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '@config/database';
import { User } from '@entities/user.entity';

const userRepository = AppDataSource.getRepository(User);

export class AuthService {
  static async register(userData: Partial<User>) {
    const hashedPassword = await bcrypt.hash(userData.password!, 10);
    const user = userRepository.create({ ...userData, password: hashedPassword });
    await userRepository.save(user);
    return user;
  }

  static async login(username: string, password: string) {
    const user = await userRepository.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      return { token, user };
    }
    throw new Error('Invalid credentials');
  }

  static async resetPassword(email: string, newPassword: string) {
    const user = await userRepository.findOne({ where: { email } });
    if (!user) throw new Error('User not found');
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await userRepository.save(user);
    return user;
  }
}
