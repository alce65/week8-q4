import { UsersController } from "../controllers/users.controller.js";
import { AuthInterceptor } from "../middleware/auth.interceptor.js";
import { UsersMongoRepo } from "../repos/users/users.mongo.repo.js";
import createDebug from 'debug';
import { Router as createRouter } from 'express';

const debug = createDebug('W7E:users:router');

export const usersRouter = createRouter();
debug('Starting');

const repo = new UsersMongoRepo();
const controller = new UsersController(repo);
const interceptor = new AuthInterceptor();

usersRouter.get('/', controller.getAll.bind(controller)); // Ver todos los usuarios
usersRouter.post('/register', controller.create.bind(controller)); // Crear usuario
usersRouter.post('/login', controller.login.bind(controller)); // Hacer log in
usersRouter.patch( // Añadir usuario a amigo
  '/add-friend/:id', 
  interceptor.authorization.bind(interceptor),
  controller.update.bind(controller),
);
  
usersRouter.patch( // Token JWT
  '/login',
  interceptor.authorization.bind(interceptor),
  controller.login.bind(controller)
);
