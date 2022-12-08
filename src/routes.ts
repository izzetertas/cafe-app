import express from 'express';
import Container from 'typedi';
import OrderController from './controllers/order.controller';

const router = express.Router();

router.get('/tasks', async (req, res) => {
  const orderController = Container.get(OrderController);

  return orderController.getTasks(req, res);
});

router.post('/submitOrder', async (req, res) => {
  const orderController = Container.get(OrderController);

  return orderController.save(req, res);
});

export default router;
