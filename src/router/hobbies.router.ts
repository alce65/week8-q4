import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { HobbiesController } from '../controller/hobbies.controller.js';
import { HobbiesMongoRepo } from '../repos/hobbies.mongo.repo.js'
import { AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('W7E:hobbies:router');

export const hobbiesRouter = createRouter();
debug('Starting');

const repo = new HobbiesMongoRepo();
const controller = new HobbiesController(repo);
const interceptor = new AuthInterceptor()

hobbiesRouter.get('/', controller.getAll.bind(controller));
// ShobbiesRouter.get('/search', controller.search.bind(controller));
hobbiesRouter.get('/:id', controller.getById.bind(controller));
hobbiesRouter.post(
  '/',
  interceptor.authorization.bind(interceptor),
  controller.create.bind(controller)
);
hobbiesRouter.patch(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.authenticationHobbies.bind(interceptor),
  controller.update.bind(controller)
);
hobbiesRouter.delete(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.authenticationHobbies.bind(interceptor),
  controller.delete.bind(controller)
)


// YhobbiesRouter.get('/', controller.getAll.bind(controller));
// hobbiesRouter.get('/search', controller.search.bind(controller));
// hobbiesRouter.get('/:id', controller.getById.bind(controller));
// hobbiesRouter.post('/', controller.create.bind(controller));
// hobbiesRouter.patch('/:id', controller.update.bind(controller));
// hobbiesRouter.patch('addUser/:id', controller.update.bind(controller));
// hobbiesRouter.patch('removeUser/:id', controller.update.bind(controller));
// hobbiesRouter.delete('/:id', controller.delete.bind(controller));
