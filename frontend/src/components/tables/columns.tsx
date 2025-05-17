import { ColumnDef } from "@tanstack/react-table";
import { clsx } from "clsx";

export interface Users {
  id?: string;
  names: string;
  email: string;
  role: string;
  telephone: string;
}

export interface Vehicle {
  id?: string;
  plateNumber: string;
  color: string;
  status?: string;
  userId?: string;
  vehicleType?: string;
  model?: string;
}

export interface Requests {
  id?: string;
  userId: string;
  vehicleId: string;
  parkingSlotId?: string;
  checkIn?: string;
  checkOut?: string;
  status?: "pending" | "approved" | "rejected";
}

export interface Slots {
  id?: string;
  slotNumber: number;
  isAvailable: boolean;
}

//user columns 
export const userColumns = (): ColumnDef<Users>[] => [
  {
    accessorKey: "names",
    header: "Username",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "telephone",
    header: "Phone number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: (info) => info.getValue(),
  }
];

// VEHICLE COLUMNS
export const vehicleColumns = (): ColumnDef<Vehicle>[] => [
  {
    accessorKey: "plateNumber",
    header: "Plate Number",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
];

// REQUEST COLUMNS
export const requestColumns = (): ColumnDef<Requests>[] => [
  {
    accessorKey: "parkingSlot.slotNumber",
    header: "Parking Slot",
    cell: (info) => info.getValue() || "Not yet assigned",
  },
  {
    accessorKey: "vehicle.plateNumber",
    header: "Plate Number",
    cell: (info) => info.getValue() || "Not yet assigned",
  },
  {
    accessorKey: "checkIn",
    header: "Check In",
    cell: (info) => {
      const value = info.getValue() as string | null;
      if (!value) return "—";
      const date = new Date(value);
      return date.toLocaleString(); // Formats to "MM/DD/YYYY, HH:MM:SS"
    },
  },
  {
    accessorKey: "checkOut",
    header: "Check Out",
    cell: (info) => {
      const value = info.getValue() as string | null;
      if (!value) return "—";
      const date = new Date(value);
      return date.toLocaleString();
    },
  },
  {
    accessorKey: "requestedAt",
    header: "Requested date",
    cell: (info) => {
      const value = info.getValue() as string | null;
      if (!value) return "—";
      const date = new Date(value);
      return date.toLocaleString();
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const status = info.getValue() as string;

      const statusColor = {
        PENDING: "bg-yellow-100 text-yellow-800",
        APPROVED: "bg-green-100 text-green-800",
        REJECTED: "bg-red-100 text-red-800",
      };

      return (
        <span
          className={clsx(
            "px-2 py-1 rounded-full text-sm font-medium",
            statusColor[status as keyof typeof statusColor] ||
              "bg-gray-100 text-gray-800"
          )}
        >
          {status}
        </span>
      );
    },
  },
];

// SLOT COLUMNS
export const slotColumns = (): ColumnDef<Slots>[] => [
  {
    accessorKey: "slotNumber",
    header: "Slot Number",
  },
  {
    accessorKey: "isAvailable",
    header: "Available",
    cell: (info) =>
      info.getValue() ? (
        <span className="text-green-600 font-medium">Yes</span>
      ) : (
        <span className="text-red-600 font-medium">No</span>
      ),
  },
];
