import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "src/components/ui/table";
import { CourierType } from "src/types";

function CouriersTable({ couriers }: { couriers: CourierType[] }) {
  return (
    <div className="overflow-auto h-full">
      <h2 className="text-xl font-semibold mb-2">Available Couriers</h2>
      <Table className="w-full border-collapse">
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Vehicle</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {couriers.map((courier) => (
            <TableRow key={courier.id}>
              <TableCell>{courier.id}</TableCell>
              <TableCell>{courier.name}</TableCell>
              <TableCell>{courier.phone}</TableCell>
              <TableCell>{courier.vehicle}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { CouriersTable };
