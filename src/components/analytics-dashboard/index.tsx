import { useTranslation } from "react-i18next";

type AnalyticsProps = {
  completedOrders: number;
  assignedCouriers: number;
};

function AnalyticsDashboard({
  completedOrders,
  assignedCouriers,
}: AnalyticsProps) {
  const { t } = useTranslation("orders");
  return (
    <div className="my-4 p-4 border rounded-md">
      <h2 className="text-xl font-semibold mb-2">
        {t("order_management_analytics")}
      </h2>
      <ul>
        <li>Total Completed Orders: {completedOrders}</li>
        <li>Total Assigned Couriers: {assignedCouriers}</li>
      </ul>
    </div>
  );
}

export { AnalyticsDashboard };
