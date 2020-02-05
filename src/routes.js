import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';
import WithdrawOrderController from './app/controllers/WithdrawOrderController';
import ListOrderController from './app/controllers/ListOrderController';
import DeliverOrderController from './app/controllers/DeliverOrderController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import CancelDeliveryController from './app/controllers/CancelDeliveryController';

import FileController from './app/controllers/FileController';

import SessionController from './app/controllers/SessionController';

import authMiddlaware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.put(
  '/deliveryman/:id/withdraw/:order_id',
  WithdrawOrderController.update
);

routes.put('/deliveryman/:id/deliver/:order_id', DeliverOrderController.update);

routes.get('/deliveryman/:id/deliveries', ListOrderController.index);

routes.get('/delivery/:id/problems', DeliveryProblemController.index);

routes.get('/delivery/:id/problems/:order_id', DeliveryProblemController.show);

routes.post(
  '/deliveryman/:id/problems/:order_id',
  DeliveryProblemController.store
);

routes.put('/problem/:id/cancel-delivery', CancelDeliveryController.update);

routes.use(authMiddlaware);

// admin
routes.put('/users', UserController.update);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
