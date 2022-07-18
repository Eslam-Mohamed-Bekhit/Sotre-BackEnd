import * as rest from '../controllers/orders.controller';
import {Router } from 'express';
import authenticationMiddleware from '../middleware/authentication.middleware';

const routes = Router();

routes.get('/', authenticationMiddleware,rest.index);
routes.post('/', authenticationMiddleware,rest.create);
routes.get('/users/:id', authenticationMiddleware,rest.getOrderByUserId);
routes.patch('/:id',authenticationMiddleware,rest.updateProduct);
routes.delete('/:id',authenticationMiddleware, rest.deleteProduct);
routes.get('/:id', authenticationMiddleware,rest.show);


export default routes;
