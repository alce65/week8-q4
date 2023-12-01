import { UsersController } from '../controllers/users.controller.js';
import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { UsersMongoRepo } from '../repos/users/users.mongo.repo.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { FileInterceptor } from '../middleware/file.interceptor.js';
import { ValidationInterceptor } from '../middleware/validation.interceptor.js';

const debug = createDebug('W8E:users:router');

export const usersRouter = createRouter();
debug('Starting');

const repo = new UsersMongoRepo();
const controller = new UsersController(repo);
const interceptor = new AuthInterceptor();
const fileInterceptor = new FileInterceptor();
const validationInterceptor = new ValidationInterceptor();

usersRouter.get(
  '/',
  interceptor.authorization.bind(interceptor),
  controller.getAll.bind(controller)
);

usersRouter.post(
  '/register',
  fileInterceptor.singleFileStore('avatar').bind(fileInterceptor),
  validationInterceptor.registerValidator().bind(validationInterceptor),
  controller.create.bind(controller)
);

usersRouter.post('/login', controller.login.bind(controller)); // Hacer log in

usersRouter.patch(
  '/login',
  interceptor.authorization.bind(interceptor),
  controller.login.bind(controller)
);

usersRouter.patch(
  '/add-friend/:id',
  interceptor.authorization.bind(interceptor),
  controller.addFriend.bind(controller)
);

usersRouter.patch(
  '/add-enemy/:id',
  interceptor.authorization.bind(interceptor),
  controller.addEnemy.bind(controller)
);

usersRouter.patch(
  '/remove-friend/:id',
  interceptor.authorization.bind(interceptor),
  controller.removeFriend.bind(controller)
);

usersRouter.patch(
  '/remove-enemy/:id',
  interceptor.authorization.bind(interceptor),
  controller.removeEnemy.bind(controller)
);

usersRouter.patch(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.authentication.bind(interceptor),

  controller.update.bind(controller)
);

usersRouter.delete(
  '/:id',
  interceptor.authorization.bind(interceptor),
  // Los usuarios borran lo suyo
  // interceptor.authentication.bind(interceptor),
  // Los Admin pueden borrar
  interceptor.isAdmin.bind(interceptor),
  controller.delete.bind(controller)
);
