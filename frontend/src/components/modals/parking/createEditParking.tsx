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
import { createSlot, updateSlot } from "../../../services/slotService";

interface CreateEditSlotProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  slotToEdit?: {
    id?: string;
    slotNumber: number;
    isAvailable: boolean;
  } | null;
  onSuccess: () => void;
}

interface SlotFormData {
  slotNumber: number;
  isAvailable: "yes" | "no";
}

const CreateEditSlot: React.FC<CreateEditSlotProps> = ({
  isOpen,
  onOpenChange,
  slotToEdit,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SlotFormData>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slotToEdit) {
      reset({
        slotNumber: slotToEdit.slotNumber,
        isAvailable: slotToEdit.isAvailable ? "yes" : "no",
      });
    } else {
      reset({
        isAvailable: "yes",
      });
    }
  }, [slotToEdit, reset]);

  const onSubmit = async (data: SlotFormData) => {
    setLoading(true);
    try {
      const finalData = {
        slotNumber: data.slotNumber,
        isAvailable: data.isAvailable === "yes",
      };
      if (slotToEdit) {
        await updateSlot(slotToEdit.id || "", finalData);
      } else {
        await createSlot(finalData);
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save slot", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{slotToEdit ? "Edit Slot" : "Create Slot"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Slot Number</label>
            <Input
              type="number"
              {...register("slotNumber", { required: true, valueAsNumber: true })}
            />
            {errors.slotNumber && (
              <p className="text-red-600">Slot Number is required</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Available</label>
            <Select
              value={slotToEdit ? (slotToEdit.isAvailable ? "yes" : "no") : "yes"}
              onValueChange={(value) => setValue("isAvailable", value as "yes" | "no")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
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

export default CreateEditSlot;
