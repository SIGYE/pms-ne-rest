import axios from "axios";
import API_ENDPOINTS from "../constants/api";
import { toast } from "sonner";
import { Vehicle } from "@/components/tables/columns";

export async function getAllVehicles() {
  try {
    const response = await axios.get(API_ENDPOINTS.vehicle.all, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Vehicles loaded successfully");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to load vehicles";
    toast.error(errorMessage);
    throw error;
  }
}

export async function createVehicle(vehicleData: Vehicle) {
  try {
    const response = await axios.post(API_ENDPOINTS.vehicle.create, vehicleData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Vehicle created successfully");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to create vehicle";
    toast.error(errorMessage);
    throw error;
  }
}

export async function updateVehicle(id: string, updateData: Partial<{
  plateNumber: string;
  color: string;
  status?: string;
  userId: string;
}>) {
  try {
    const response = await axios.put(API_ENDPOINTS.vehicle.update(id), updateData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Vehicle updated successfully");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to update vehicle";
    toast.error(errorMessage);
    throw error;
  }
}

export async function deleteVehicle(id: string) {
  try {
    const response = await axios.delete(API_ENDPOINTS.vehicle.delete(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Vehicle deleted successfully");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to delete vehicle";
    toast.error(errorMessage);
    throw error;
  }
}

export async function getVehicleById(id: string) {
  try {
    const response = await axios.get(API_ENDPOINTS.vehicle.getById(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get vehicle by ID", error);
    throw error;
  }
}
