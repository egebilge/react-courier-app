import * as React from "react";
import { API } from "src/lib/api";
import { BasketsTable } from "src/modules/orders/components/baskets-table";
import { CouriersTable } from "src/modules/orders/components/couriers-table";
import { AnalyticsDashboard } from "src/components/analytics-dashboard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "src/components/ui/card";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { LANGUAGE, OrderStatus, OrderType } from "src/types";

import { OrdersTable } from "../components/orders-table";
import { OrderDetailsModal } from "../components/order-details-modal";
import { useOrders } from "../hooks/useOrders";
import { useTranslation } from "react-i18next";
import { getNextLanguageInfo } from "../constants/languages";

function OrdersContainer() {
  const { t, i18n } = useTranslation("orders");

  const {
    orders,
    baskets,
    couriers,
    isOrdersLoading,
    isBasketsLoading,
    isCouriersLoading,
  } = useOrders();

  const [selectedOrder, setSelectedOrder] = React.useState<OrderType | null>(
    null
  );
  const [notifications, setNotifications] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [language, setLanguage] = React.useState(
    localStorage.getItem("@browserLanguage") || LANGUAGE.EN
  );

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.address?.toLowerCase().includes(searchTerm) ||
      o.status?.toLowerCase().includes(searchTerm)
  );

  const filteredBaskets = baskets.filter((b) =>
    b.orders.some(
      (o) =>
        o.address?.toLowerCase().includes(searchTerm) ||
        o.status?.toLowerCase().includes(searchTerm)
    )
  );

  const onDragEnd = async (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;

    if (sourceId === "orders" && destinationId === "baskets") {
      const draggedOrder = orders[source.index];
      const targetBasket = baskets[destination.index];

      const updatedOrder = { ...draggedOrder, basketId: targetBasket.id };
      await API.put(`/orders/${draggedOrder.id}`, updatedOrder);

      addNotification("Order moved to a basket successfully.");
    }
  };

  const handleOrderClick = (order: OrderType) => {
    setSelectedOrder(order);
  };

  const closeOrderDetailsModal = () => {
    setSelectedOrder(null);
  };

  const handleLanguageSelection = () => {
    const nextLanguageInfo = getNextLanguageInfo(language as LANGUAGE);
    localStorage.setItem("@browserLanguage", nextLanguageInfo.key);
    i18n.changeLanguage(nextLanguageInfo.key);
    setLanguage(nextLanguageInfo.key);
  };

  const flagInfo = getNextLanguageInfo(language as LANGUAGE);

  const completedOrders = orders.filter(
    (o) => o.status === OrderStatus.Completed
  ).length;
  const assignedCouriers = baskets.filter((b) => b.courierId).length;

  if (isOrdersLoading || isBasketsLoading || isCouriersLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-4 h-full">
      <div className="flex justify-end">
        <img
          src={flagInfo.flagSrc}
          alt={`${flagInfo.languageKey} flag`}
          className="w-8 h-8 cursor-pointer"
          onClick={handleLanguageSelection}
        />
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        className="border rounded-md px-2 py-1"
      />
      {notifications.length > 0 && (
        <div className="fixed top-0 right-0 m-4 p-4 bg-blue-200 rounded-md shadow-md">
          {notifications.map((note, index) => (
            <div key={index}>{note}</div>
          ))}
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>{t("analytics")}</CardTitle>
        </CardHeader>

        <AnalyticsDashboard
          completedOrders={completedOrders}
          assignedCouriers={assignedCouriers}
        />
      </Card>
      <div className="mb-4 flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Couriers</CardTitle>
          </CardHeader>
          <CardContent>
            <CouriersTable couriers={couriers} />
          </CardContent>
        </Card>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="mb-4 flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Droppable droppableId="orders" type="ORDER">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="mb-4"
                  >
                    <OrdersTable
                      orders={filteredOrders}
                      onOrderClick={handleOrderClick}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </CardContent>
          </Card>
        </div>
        <div className="mb-4 flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Baskets</CardTitle>
            </CardHeader>
            <CardContent>
              <Droppable droppableId="baskets" type="BASKET">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="mb-4"
                  >
                    <BasketsTable baskets={filteredBaskets} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </CardContent>
          </Card>
        </div>
      </DragDropContext>
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={closeOrderDetailsModal}
        />
      )}
    </div>
  );
}

export { OrdersContainer };
