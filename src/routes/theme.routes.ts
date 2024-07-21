import { Router } from 'express';
import { ThemeController } from '../controllers/theme.controller';

const router = Router();

router.get('/', ThemeController.getAllThemes);

export default router;
