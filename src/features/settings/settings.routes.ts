import { Router } from 'express';

import SettingsController from './settings.controller';

const router = Router();

router.post('/reload', SettingsController.reload);

export default router;
