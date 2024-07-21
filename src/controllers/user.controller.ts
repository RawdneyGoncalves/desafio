import { Request, Response } from 'express';
import { AuthService } from '@services/auth.service';

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const token = await AuthService.login(username, password);
      res.status(200).json(token);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const { email, newPassword } = req.body;
      const user = await AuthService.resetPassword(email, newPassword);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}
