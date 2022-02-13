import { Router } from 'express';

import calculation from 'features/calculation/calculation.routes';
import validator from 'features/validator/validator.routes';

const routes = Router();

routes.use('/calculation', calculation);
routes.use('/validator', validator);

export default routes;
