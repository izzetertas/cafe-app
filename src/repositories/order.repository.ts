import { Service } from 'typedi';
import { Order } from '../models/order-model';

@Service()
class OrderRepository {
  private readonly entities: Order[] = [];

  findLastOrder = () => {
    const lastIndex = this.entities.length;
    if (!lastIndex) {
      return;
    }
    return this.entities[lastIndex - 1];
  };

  save = async (entity: Order) => {
    this.entities.push(entity);
  };

  getAll = async (): Promise<Order[]> => {
    return this.entities;
  };
}

export default OrderRepository;
