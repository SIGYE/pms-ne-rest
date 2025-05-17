import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../components/tables";
import {
  vehicleColumns as getVehicleColumns,
  Vehicle,
} from "../../components/tables/columns";
import API_ENDPOINTS from "../../constants/api";
import CreateEditVehicle from "../../components/modals/vehicles/CreateEditVehicle";
import { Button } from "../../components/ui/button";
import { deleteVehicle } from "../../services/vehicleService";
import { toast } from "sonner";
import Loader from "../../components/commons/loader";

const VehiclePage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table"); // Added grid view

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const UserRole = parsedUser.role?.toLowerCase();

  const fetchVehicles = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_ENDPOINTS.vehicle.all, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const { data } = response;
      setVehicles(data);
    } catch (err) {
      console.error("Vehicle fetch error:", err);
      setError("Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDialogOpen(true);
  };

  const handleCreateVehicle = () => {
    setSelectedVehicle(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (vehicle: Vehicle) => {
    try {
      await deleteVehicle(vehicle.id || "");
      toast.success("Vehicle deleted successfully");
      fetchVehicles();
    } catch {
      toast.error("Failed to delete vehicle");
    }
  };

  const handleSuccess = () => {
    fetchVehicles();
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Vehicles</h1>

        <div className="flex gap-2">
          {/* Create Vehicle */}
          {UserRole === "user" && (
            <Button onClick={handleCreateVehicle}>Create Vehicle</Button>
          )}

          {/* Toggle buttons */}
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            onClick={() => setViewMode("table")}
          >
            Table View
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
          >
            Card View
          </Button>
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Loader or Content */}
      {loading ? (
        <Loader />
      ) : viewMode === "table" ? (
        <DataTable<Vehicle>
          data={vehicles}
          columns={getVehicleColumns()}
          onEdit={handleEdit}
          onDelete={handleDelete}
          role={UserRole}
          tableType="vehicle"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-bold mb-2 text-blue-700">
                {vehicle.vehicleType}
              </h2>
              <p className="text-sm mb-1">
                <strong>Plate:</strong> {vehicle.plateNumber}
              </p>
              <p className="text-sm mb-1">
                <strong>Color:</strong> {vehicle.color || "N/A"}
              </p>
              <p className="text-sm mb-1">
                <strong>Model:</strong> {vehicle.model || "N/A"}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 justify-end">
                <Button onClick={() => handleEdit(vehicle)} variant="outline">
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(vehicle)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateEditVehicle
        isOpen={isDialogOpen}
        vehicleToEdit={selectedVehicle}
        onOpenChange={setIsDialogOpen}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default VehiclePage;
