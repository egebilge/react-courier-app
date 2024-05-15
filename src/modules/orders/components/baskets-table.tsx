import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "src/components/ui/table";
import { Draggable } from "react-beautiful-dnd";
import { Button } from "src/components/ui/button";
import { BasketType } from "src/types";

type BasketsTableProps = {
  baskets: BasketType[];
};

function BasketsTable({ baskets }: BasketsTableProps) {
  return (
    <div className="overflow-auto h-full">
      <Table className="w-full border-collapse">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Courier</TableHead>
            <TableHead>Orders</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {baskets.map((basket, index) => (
            <Draggable
              key={`basket-${basket.id}`}
              draggableId={`basket-${basket.id}`}
              index={index}
            >
              {(provided) => (
                <TableRow
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TableCell>{basket.id}</TableCell>
                  <TableCell>{basket.status}</TableCell>
                  <TableCell>{basket.courierId || "Unassigned"}</TableCell>
                  <TableCell>
                    {basket.orders.map((order) => (
                      <div key={order.id}>
                        Order {order.id}:
                        <Button onClick={() => console.log("Delivered")}>
                          {order.status === "delivered"
                            ? "Delivered"
                            : "Undelivered"}
                        </Button>
                      </div>
                    ))}
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

export { BasketsTable };
