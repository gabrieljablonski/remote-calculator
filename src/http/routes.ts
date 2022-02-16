import { Router } from 'express';

import calculation from 'features/calculation/calculation.routes';
import settings from 'features/settings/settings.routes';

const routes = Router();

routes.use('/calculation', calculation);
routes.use('/settings', settings);

export default routes;
