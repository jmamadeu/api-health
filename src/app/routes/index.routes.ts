import express from 'express'

import DiaseaseTypesRoutes from './DiaseaseType.routes'

const routes = express.Router()

routes.use('/diasease-types', DiaseaseTypesRoutes)

export default routes