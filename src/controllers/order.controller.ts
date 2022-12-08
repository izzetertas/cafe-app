import { Request, Response } from 'express';
import { Service } from 'typedi';
import OrderService from '../services/order.service';

@Service()
class OrderController {
  constructor(private readonly orderService: OrderService) {}

  async getTasks(req: Request, res: Response) {
    const result = await this.orderService.getTasks();

    return res.json(result);
  }

  async save(req: Request, res: Response) {
    const result = await this.orderService.save(req.body);

    return res.status(201).send(result);
  }
}

export default OrderController;
