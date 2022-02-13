import { Router } from 'express';

import calculation from 'features/calculation/calculation.routes';

const routes = Router();

routes.use('/calculation', calculation);

export default routes;
