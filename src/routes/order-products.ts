import * as rest from '../controllers/order-product.controller';
import { Router } from 'express';
import authenticationMiddleware from '../middleware/authentication.middleware';

const routes = Router();

routes.post('/:id',authenticationMiddleware, rest.create);
routes.get('/:id/products',authenticationMiddleware,rest.index);
routes.get('/:id/products/:id',authenticationMiddleware, rest.show);
routes.patch('/:id/products/:id',authenticationMiddleware, rest.update);
routes.delete('/:id/products/:id',authenticationMiddleware,rest.deleteOrderProduct);

export default routes;
