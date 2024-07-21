import { Router } from 'express';
import { PackageController } from '../controllers/package.controller';

const router = Router();

router.post('/', PackageController.create);
router.get('/', PackageController.list);
router.get('/:id', PackageController.get);

export default router;
