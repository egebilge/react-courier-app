import { Button } from "src/components/ui/button";
import { API } from "src/lib/api";
import { BasketType } from "src/types";

function BasketWithStatus({ basket }: { basket: BasketType }) {
  const updateOrderStatus = async (orderId: number, status: string) => {
    await API.put(`/orders/${orderId}`, { status });

    const updatedOrders = basket.orders.map((order) =>
      order.id === orderId ? { ...order, status } : order
    );

    if (updatedOrders.every((order) => order.status === "delivered")) {
      await API.delete(`/baskets/${basket.id}`);
    }
  };

  return (
    <div>
      Basket {basket.id}: {basket.status}
      {basket.orders?.map((order) => (
        <div key={order.id}>
          Order {order.id}: {order.status}
          <Button onClick={() => updateOrderStatus(order.id, "delivered")}>
            Delivered
          </Button>
          <Button onClick={() => updateOrderStatus(order.id, "undelivered")}>
            Undelivered
          </Button>
        </div>
      ))}
    </div>
  );
}

export { BasketWithStatus };
