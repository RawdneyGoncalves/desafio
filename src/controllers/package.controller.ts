import { Request, Response } from 'express';
import { PackageService } from '@services/package.service';

export class PackageController {
  static async create(req: Request, res: Response) {
    try {
      const pkg = await PackageService.create(req.body);
      res.status(201).json(pkg);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const packages = await PackageService.findAll();
      res.status(200).json(packages);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  static async get(req: Request, res: Response) {
    try {
      const pkg = await PackageService.findById(parseInt(req.params.id));
      if (!pkg) return res.status(404).json({ message: 'Package not found' });
      res.status(200).json(pkg);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}
