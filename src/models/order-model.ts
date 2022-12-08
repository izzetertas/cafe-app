export interface Order {
  customerName: string;
  orderNumber: number;
  orderDate: Date;
  startDate: Date;
  deliveryDate: Date;
}

export interface OrderRequestDTO {
  customerName: string;
}
