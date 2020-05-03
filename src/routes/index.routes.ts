import express from 'express';

import DiaseaseTypesRoutes from './DiaseaseType.routes';
import DiaseaseRoutes from './Diasease.routes';

const routes = express.Router();

routes.use('/diasease-types', DiaseaseTypesRoutes);
routes.use('/diaseases', DiaseaseRoutes);

export default routes;
