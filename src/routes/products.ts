import { Router } from 'express';
import * as rest from '../controllers/products.controller';
import authenticationMiddleware from '../middleware/authentication.middleware';


const routes = Router();

routes.post('/',authenticationMiddleware, rest.create);
routes.get('/',authenticationMiddleware,rest.show);
routes.get('/:id', authenticationMiddleware,rest.showProduct);
routes.patch('/:id',authenticationMiddleware,rest.updateProduct);
routes.delete('/:id',authenticationMiddleware, rest.deleteProduct);

export default routes;
