import { Order } from '../models/order-model';
import OrderRepository from './order.repository';

describe('order.repository', () => {
  describe('getAll()', () => {
    it('should not return any records', async () => {
      const orderRepository = new OrderRepository();

      expect(await orderRepository.getAll()).toHaveLength(0);
    });

    it('should return a record once an order is received', async () => {
      const order: Order = {
        customerName: 'Izzet',
        orderNumber: 1,
        startDate: new Date(),
        deliveryDate: new Date(),
        orderDate: new Date()
      };
      const orderRepository = new OrderRepository();
      await orderRepository.save(order);

      expect(await orderRepository.getAll()).toEqual([order]);
    });
  });

  describe('findLastOrder()', () => {
    it('should return last order', async () => {
      const order: Order = {
        customerName: 'Izzet',
        orderNumber: 1,
        startDate: new Date(),
        deliveryDate: new Date(),
        orderDate: new Date()
      };
      const orderRepository = new OrderRepository();
      await orderRepository.save(order);

      await orderRepository.save({ ...order, orderNumber: 2 });

      expect(await orderRepository.findLastOrder()?.orderNumber).toEqual(2);
    });
  });
});
