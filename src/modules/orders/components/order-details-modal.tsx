import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "src/components/ui/dialog";
import { Button } from "src/components/ui/button";

type OrderType = {
  id: number;
  address: string;
  timestamp: string;
  products: { name: string; quantity: number }[];
  status: string;
};

type OrderDetailsModalProps = {
  order: OrderType;
  onClose: () => void;
};

function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  return (
    <Dialog open onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            <strong>ID:</strong> {order.id}
          </p>
          <p>
            <strong>Address:</strong> {order.address}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Products:</strong>
          </p>
          <ul>
            {order.products.map((product) => (
              <li key={product.name}>
                {product.name} - Quantity: {product.quantity}
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { OrderDetailsModal };
