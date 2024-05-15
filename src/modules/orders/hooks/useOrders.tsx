import * as React from "react";
import { useQuery } from "react-query";
import { API } from "src/lib/api";
import { BasketType, CourierType, OrderType } from "src/types";

function useOrders() {
  const [orders, setOrders] = React.useState<OrderType[]>([]);
  const [baskets, setBaskets] = React.useState<BasketType[]>([]);
  const [couriers, setCouriers] = React.useState<CourierType[]>([]);

  const { isLoading: isOrdersLoading } = useQuery<OrderType[]>(
    "orders",
    async () => {
      const { data } = await API.get("/orders");
      setOrders(data);

      return data;
    }
  );

  const { isLoading: isBasketsLoading } = useQuery<BasketType[]>(
    "baskets",
    async () => {
      const { data } = await API.get("/baskets");
      setBaskets(data);

      return data;
    }
  );

  const { isLoading: isCouriersLoading } = useQuery<CourierType[]>(
    "couriers",
    async () => {
      const { data } = await API.get("/couriers");
      setCouriers(data);

      return data;
    }
  );

  return {
    isOrdersLoading,
    isBasketsLoading,
    isCouriersLoading,
    orders,
    baskets,
    couriers,
  };
}
export { useOrders };
