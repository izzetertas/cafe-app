import OrderService from './order.service';

import constants from '../constants';
import { Order, OrderRequestDTO } from '../models/order-model';
import OrderRepository from '../repositories/order.repository';

const orderDate = new Date(2022, 12, 12, 12, 0, 0);
const orders: Order[] = [
  {
    customerName: 'test 1',
    orderNumber: 1,
    orderDate,
    startDate: new Date(orderDate.getTime() + constants.PREPARATION_TIME),
    deliveryDate: new Date(orderDate.getTime() + constants.PREPARATION_TIME + constants.DELIVERY_TIME)
  }
];

describe('order.service', () => {
  const orderRepository = new OrderRepository();
  it('should not return any records if there is no order', async () => {
    const orderService = new OrderService(orderRepository);
    const result = await orderService.getTasks();
    expect(result).toEqual([]);
  });

  it('should return tasks expected once an order is received', async () => {
    jest.spyOn(orderRepository, 'getAll').mockResolvedValue(orders);

    const orderService = new OrderService(orderRepository);
    const result = await orderService.getTasks();

    const expected = [
      { taskNumber: 1, taskName: '02:30 Make sandwich #1 for test 1' },
      { taskNumber: 2, taskName: '03:30 Serve sandwich #1 for test 1' },
      { taskNumber: 3, taskName: '04:30 Take a break.' }
    ];

    expect(result).toEqual(expected);
  });

  it('should save new order', async () => {
    const order: OrderRequestDTO = {
      customerName: 'Rob'
    };

    jest.spyOn(orderRepository, 'getAll').mockResolvedValue([]);
    jest.spyOn(orderRepository, 'save').mockResolvedValue();

    const orderService = new OrderService(orderRepository);
    const result = await orderService.save(order);

    expect(result.customerName).toEqual(order.customerName);
  });
});
