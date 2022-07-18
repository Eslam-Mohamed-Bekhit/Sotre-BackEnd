import {  Router } from 'express';
import * as rest from  '../controllers/user.controller';
import authenticationMiddleware from '../middleware/authentication.middleware';

const routes = Router();
routes.post('/authenticate', rest.signIn);
routes.post( '/', rest.create);
routes.get( '/',authenticationMiddleware,rest.show);
routes.get('/:id',authenticationMiddleware,rest.showUser);
routes.patch('/:id',authenticationMiddleware,rest.update);
routes.delete('/:id',authenticationMiddleware,rest.deleteUser);
export default routes;