import express from 'express'

import DiaseaseTypesController from '../controllers/DiaseaseTypeController'

const routes = express.Router()

routes.get('/', DiaseaseTypesController.index)
routes.get('/:id', DiaseaseTypesController.show)

routes.post('/', DiaseaseTypesController.store)

routes.put('/:id', DiaseaseTypesController.update)

routes.delete('/:id', DiaseaseTypesController.delete)

export default routes