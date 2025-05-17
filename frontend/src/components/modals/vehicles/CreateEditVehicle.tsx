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
import { createVehicle, updateVehicle } from "../../../services/vehicleService";

interface CreateEditVehicleProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleToEdit?: {
    id?: string;
    plateNumber: string;
    color: string;
  } | null;
  onSuccess: () => void;
}

interface VehicleFormData {
  plateNumber: string;
  color: string;
}

const CreateEditVehicle: React.FC<CreateEditVehicleProps> = ({
  isOpen,
  onOpenChange,
  vehicleToEdit,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormData>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vehicleToEdit) {
      reset({
        plateNumber: vehicleToEdit.plateNumber,
        color: vehicleToEdit.color,
      });
    } else {
      reset({});
    }
  }, [vehicleToEdit, reset]);

  const onSubmit = async (data: VehicleFormData) => {
    setLoading(true);
    try {
      if (vehicleToEdit) {
        await updateVehicle(vehicleToEdit.id || "", data);
      } else {
        const user = localStorage.getItem("user");
        const userId = user ? JSON.parse(user).id : "";
        await createVehicle({ ...data, userId });
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save vehicle", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {vehicleToEdit ? "Edit Vehicle" : "Create Vehicle"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Plate Number</label>
            <Input {...register("plateNumber", { required: true })} />
            {errors.plateNumber && (
              <p className="text-red-600">Plate Number is required</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Color</label>
            <Input {...register("color", { required: true })} />
            {errors.color && <p className="text-red-600">Color is required</p>}
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

export default CreateEditVehicle;
