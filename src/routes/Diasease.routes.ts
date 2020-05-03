import express from 'express';

import DiaseaseController from '../controllers/DiaseaseController';

const routes = express.Router();

routes.get('/', DiaseaseController.index);
routes.get('/:id', DiaseaseController.show);

routes.put('/:id', DiaseaseController.update);
routes.delete('/:id', DiaseaseController.delete);
routes.post('/', DiaseaseController.create);

export default routes;
