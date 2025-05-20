import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../components/tables";
import { slotColumns, Slots } from "../../components/tables/columns";
import API_ENDPOINTS from "../../constants/api";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import Loader from "../../components/commons/loader";
import { deleteSlot } from "../../services/slotService";
import CreateEditSlot from "../../components/modals/slot/createEditSlot";

const SlotsPage: React.FC = () => {
  const [slots, setSlots] = useState<Slots[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slots | null>(null);

  // View mode: "table" or "grid"
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const UserRole = parsedUser.role?.toLowerCase();

  // Fetch slots from backend
  const fetchSlots = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_ENDPOINTS.parkingSlots.all, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const { data } = response.data;
      console.log("Fetched slots:", data);
      setSlots(data);
    } catch (err) {
      console.error("Slot fetch error:", err);
      setError("Failed to fetch slots");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (slot: Slots) => {
    setSelectedSlot(slot);
    setIsDialogOpen(true);
  };

  // Handle create slot button click
  const handleCreateSlot = () => {
    setSelectedSlot(null);
    setIsDialogOpen(true);
  };

  // Handle delete
  const handleDelete = async (slot: Slots) => {
    try {
      await deleteSlot(slot.id || "");
      toast.success("Slot deleted successfully");
      fetchSlots();
    } catch {
      toast.error("Failed to delete slot");
    }
  };

  // Refresh slots after success (create/edit)
  const handleSuccess = () => {
    fetchSlots();
  };

  useEffect(() => {
    fetchSlots();
  }, []);


  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Slots</h1>

        {/* Admin: Create Slot Button */}
        {UserRole === "admin" && (
          <div className="flex gap-2">
            <Button onClick={handleCreateSlot}>Create Slot</Button>
            {/* Toggle View Buttons */}
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
              Grid View
            </Button>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Loader or Content */}
      {loading ? (
        <Loader />
      ) : viewMode === "table" ? (
        // Table View
        <DataTable<Slots>
          data={slots}
          columns={slotColumns()}
          onEdit={handleEdit}
          onDelete={handleDelete}
          role={UserRole}
          tableType="slots"
        />
      ) : (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-blue-800">
                Slot #{slot.slotNumber}
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    slot.isAvailable ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {slot.isAvailable ? "Available" : "Occupied"}
                </span>
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <Button onClick={() => handleEdit(slot)} variant="outline">
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(slot)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Slot Modal */}
      <CreateEditSlot
        isOpen={isDialogOpen}
        slotToEdit={selectedSlot}
        onOpenChange={setIsDialogOpen}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default SlotsPage;
