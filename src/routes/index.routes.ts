import express from 'express';

import SymptomController from '../controllers/SymptomController';
import CategoryController from '../controllers/CategoryController';
import SubCategoryController from '../controllers/SubCategoryController';
import ClassificationController from '../controllers/ClassificationController';
import DiseaseController from '../controllers/DiseaseController';

const routes = express.Router();

routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.store);

routes.get('/subcategories', SubCategoryController.index);
routes.post('/subcategories', SubCategoryController.store);

routes.get('/symptoms', SymptomController.index);
routes.post('/symptoms', SymptomController.store);

routes.get('/classifications', ClassificationController.index);
routes.post('/classifications', ClassificationController.store);

routes.get('/diseases', DiseaseController.index);
routes.post('/diseases', DiseaseController.store);

export default routes;
