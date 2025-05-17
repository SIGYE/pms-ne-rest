import axios from "axios";
import API_ENDPOINTS from "../constants/api";
import { toast } from "sonner";
import { Slots } from "@/components/tables/columns";

export async function getAllSlots() {
  try {
    const response = await axios.get(API_ENDPOINTS.parkingSlots.all, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Parking slots loaded successfully");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to load parking slots";
    toast.error(errorMessage);
    throw error;
  }
}

export async function createSlot(slotData: {
  slotNumber: number;
  isAvailable?: boolean;
}) {
  try {
    const response = await axios.post(API_ENDPOINTS.parkingSlots.create, slotData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Parking slot created successfully");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to create parking slot";
    toast.error(errorMessage);
    throw error;
  }
}

export async function updateSlot(id: string, updateData: Partial<Slots>) {
  try {
    const response = await axios.put(API_ENDPOINTS.parkingSlots.update(id), updateData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Parking slot updated successfully");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to update parking slot";
    toast.error(errorMessage);
    throw error;
  }
}

export async function deleteSlot(id: string) {
  try {
    const response = await axios.delete(API_ENDPOINTS.parkingSlots.delete(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Parking slot deleted successfully");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to delete parking slot";
    toast.error(errorMessage);
    throw error;
  }
}

export async function getSlotById(id: string) {
  try {
    const response = await axios.get(API_ENDPOINTS.parkingSlots.getById(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get parking slot by ID", error);
    throw error;
  }
}

export async function getAvailableSlots() {
  try {
    const response = await axios.get(API_ENDPOINTS.parkingSlots.available, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Available parking slots loaded successfully");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to load available parking slots";
    toast.error(errorMessage);
    throw error;
  }
}
