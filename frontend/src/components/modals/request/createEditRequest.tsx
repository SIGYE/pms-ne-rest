import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { createRequest, updateRequest } from "../../../services/requestService";
import { getAllVehicles } from "../../../services/vehicleService";

interface CreateEditRequestProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  requestToEdit?: {
    id?: string;
    vehicleId: string;
    checkIn: string;
    checkOut: string;
  } | null;
  onSuccess: () => void;
}

interface RequestFormData {
  vehicleId: string;
  checkIn: string;
  checkOut: string;
}

const CreateEditRequest: React.FC<CreateEditRequestProps> = ({
  isOpen,
  onOpenChange,
  requestToEdit,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RequestFormData>();
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState<{ id: string; plateNumber: string }[]>([]);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const data = await getAllVehicles();
        setVehicles(data);
      } catch (error) {
        console.error("Failed to load vehicles", error);
      }
    }
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (requestToEdit) {
      reset({
        vehicleId: requestToEdit.vehicleId,
        checkIn: requestToEdit.checkIn.slice(0, 16), // format for datetime-local input
        checkOut: requestToEdit.checkOut.slice(0, 16),
      });
    } else {
      reset({});
    }
  }, [requestToEdit, reset]);

  const onSubmit = async (data: RequestFormData) => {
    setLoading(true);
    try {
      const user = localStorage.getItem("user");
      const userId = user ? JSON.parse(user).id : "";
      const payload = {
        userId,
        vehicleId: data.vehicleId,
        checkIn: new Date(data.checkIn).toISOString(),
        checkOut: new Date(data.checkOut).toISOString(),
      };
      if (requestToEdit) {
        await updateRequest(requestToEdit.id || "", payload);
      } else {
        await createRequest(payload);
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save request", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (requestToEdit?.vehicleId) {
      setValue("vehicleId", requestToEdit.vehicleId);
    }
  }, [requestToEdit, setValue]);
  

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {requestToEdit ? "Edit Request" : "Create Request"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Vehicle</label>
            <Select
              value={watch("vehicleId") || ""}
              onValueChange={(value) => setValue("vehicleId", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select vehicle" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.plateNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.vehicleId && (
              <p className="text-red-600">Vehicle selection is required</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Check In</label>
            <Input
              type="datetime-local"
              {...register("checkIn", { required: true })}
            />
            {errors.checkIn && (
              <p className="text-red-600">Check In time is required</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Check Out</label>
            <Input
              type="datetime-local"
              {...register("checkOut", { required: true })}
            />
            {errors.checkOut && (
              <p className="text-red-600">Check Out time is required</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditRequest;
