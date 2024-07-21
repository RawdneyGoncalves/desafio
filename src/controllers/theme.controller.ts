import { Request, Response } from 'express';
import { ThemeService } from '@services/theme.service';

export class ThemeController {
  static async getAllThemes(req: Request, res: Response) {
    try {
      const themes = await ThemeService.getAllThemes();
      res.status(200).json(themes);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}
