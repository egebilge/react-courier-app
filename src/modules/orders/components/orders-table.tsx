import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "src/components/ui/table";
import { Button } from "src/components/ui/button";
import { Draggable } from "react-beautiful-dnd";
import { OrderType } from "src/types";

type OrdersTableProps = {
  orders: OrderType[];
  onOrderClick: (order: OrderType) => void;
};

function OrdersTable({ orders, onOrderClick }: OrdersTableProps) {
  return (
    <div className="overflow-auto h-full">
      <Table className="w-full border-collapse">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <Draggable
              key={`order-${order.id}`}
              draggableId={`order-${order.id}`}
              index={index}
            >
              {(provided) => (
                <TableRow
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    {order.products.map((product) => (
                      <div
                        key={product.name}
                      >{`${product.name} (${product.quantity})`}</div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => onOrderClick(order)}>Details</Button>
                  </TableCell>
                </TableRow>
              )}
            </Draggable>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { OrdersTable };
