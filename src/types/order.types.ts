export const OrderStatus = {
  AGUARDANDO_PAGAMENTO: 'AGUARDANDO_PAGAMENTO',
  PAGO: 'PAGO',
  CANCELADO: 'CANCELADO',
  EM_TRANSPORTE: 'EM_TRANSPORTE',
  ENTREGUE: 'ENTREGUE',
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.AGUARDANDO_PAGAMENTO]: 'Aguardando Pagamento',
  [OrderStatus.PAGO]: 'Pago',
  [OrderStatus.CANCELADO]: 'Cancelado',
  [OrderStatus.EM_TRANSPORTE]: 'Em Transporte',
  [OrderStatus.ENTREGUE]: 'Entregue',
};

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface StatusHistory {
  id: number;
  orderId: number;
  status: OrderStatus;
  notes?: string;
  changedBy: {
    id: number;
    name: string;
  };
  changedAt: string;
}

export interface UpdateOrderStatusData {
  status: OrderStatus;
  notes?: string;
}

export interface OrderFilters {
  status?: OrderStatus;
  customerName?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}
