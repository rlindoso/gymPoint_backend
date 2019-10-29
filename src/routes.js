import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddlaware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlaware); // Middleware usado apensa nas rotas abaixo (não nas de cima)
routes.put('/users', UserController.update);

export default routes;
