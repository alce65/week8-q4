import { UsersController } from "../controller/users.controller.js";
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

usersRouter.get('/', controller.getAll.bind(controller));
usersRouter.post('/register', controller.create.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
usersRouter.patch('/login', interceptor.authorization.bind(interceptor), controller.login.bind(controller));   // Hacemos login with token
