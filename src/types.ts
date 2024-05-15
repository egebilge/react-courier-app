export enum OrderStatus {
  Completed = "completed",
  Pending = "pending",
  Cancelled = "cancelled",
}

export enum LANGUAGE {
  EN = "en",
  TR = "tr",
}

export type OrderType = {
  id: number;
  address: string;
  timestamp: string;
  products: { name: string; quantity: number }[];
  status: string;
  basketId: number;
};

export type BasketType = {
  id: number;
  courierId?: number;
  status: string;
  orders: OrderType[];
};

export type CourierType = {
  id: number;
  name: string;
  phone: string;
  vehicle: string;
};
