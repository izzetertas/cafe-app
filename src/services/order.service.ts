import { Service, Inject } from 'typedi';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import dateformat from 'date-format';

import { Order, OrderRequestDTO } from '../models/order-model';
import OrderRepository from '../repositories/order.repository';
import Task from '../models/task.model';

import constants from '../constants/index';

@Service()
class OrderService {
  orderRepository: OrderRepository;

  constructor(@Inject() orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  private takeNewOrderNumber = (order?: Order) => {
    return order ? order.orderNumber + 1 : 1;
  };

  private calculateNewOrderStartDate = (orderDate: Date, lastOrder?: Order) => {
    if (!lastOrder) {
      return orderDate;
    }

    const availableDateToStart = new Date(lastOrder.deliveryDate.getTime() + constants.DELIVERY_TIME);
    if (orderDate > availableDateToStart) {
      return orderDate;
    }

    return new Date(lastOrder.deliveryDate.getTime() + constants.DELIVERY_TIME);
  };

  private calculateNewOrderDeliveryDate = (startDate: Date) => {
    return new Date(startDate.getTime() + constants.PREPARATION_TIME);
  };

  public save = async (order: OrderRequestDTO) => {
    const lastOrder = this.orderRepository.findLastOrder();

    const orderDate = new Date();
    const newOrder = {
      customerName: order.customerName,
      orderDate: orderDate,
      orderNumber: this.takeNewOrderNumber(lastOrder),
      startDate: this.calculateNewOrderStartDate(orderDate, lastOrder)
    } as Order;
    newOrder.deliveryDate = this.calculateNewOrderDeliveryDate(newOrder.startDate);

    this.orderRepository.save(newOrder);

    return newOrder;
  };

  public getTasks = async (): Promise<Task[]> => {
    const orders = await this.orderRepository.getAll();
    const taskList: Task[] = [];
    let breakTime = new Date();
    let taskNumber = 1;

    orders.forEach((order, index) => {
      taskList.push({
        taskNumber: taskNumber++,
        taskName: `${dateformat.asString('mm:ss', order.startDate)} Make sandwich #${order.orderNumber} for ${
          order.customerName
        }`
      });

      taskList.push({
        taskNumber: taskNumber++,
        taskName: `${dateformat.asString('mm:ss', order.deliveryDate)} Serve sandwich #${order.orderNumber} for ${
          order.customerName
        }`
      });

      if (orders.length === index + 1) {
        breakTime = new Date(new Date(order.deliveryDate).getTime() + 60000);
      }
    });
    if (taskList.length) {
      taskList.push({ taskNumber: taskNumber, taskName: `${dateformat.asString('mm:ss', breakTime)} Take a break.` });
    }

    return taskList;
  };
}

export default OrderService;
