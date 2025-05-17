import axios from "axios";
import API_ENDPOINTS from "../constants/api";
import { toast } from "sonner";
import { Requests } from "@/components/tables/columns";

export async function getAllRequests() {
  try {
    const response = await axios.get(API_ENDPOINTS.parkingRequests.all, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Parking requests loaded successfully");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to load parking requests";
    toast.error(errorMessage);
    throw error;
  }
}

export async function createRequest(requestData: Requests) {
  try {
    const response = await axios.post(API_ENDPOINTS.parkingRequests.create, requestData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Parking request created successfully");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to create parking request";
    toast.error(errorMessage);
    throw error;
  }
}

export async function updateRequest(id: string, updateData: Partial<{
  userId: string;
  vehicleId: string;
  parkingSlotId?: string;
  checkIn?: string;
  checkOut?: string;
  status?: string;
  approvedAt?: string;
}>) {
  try {
    const response = await axios.put(API_ENDPOINTS.parkingRequests.update(id), updateData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Parking request updated successfully");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to update parking request";
    toast.error(errorMessage);
    throw error;
  }
}

export async function deleteRequest(id: string) {
  try {
    const response = await axios.delete(API_ENDPOINTS.parkingRequests.delete(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Parking request deleted successfully");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to delete parking request";
    toast.error(errorMessage);
    throw error;
  }
}

export async function getRequestById(id: string) {
  try {
    const response = await axios.get(API_ENDPOINTS.parkingRequests.getById(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get parking request by ID", error);
    throw error;
  }
}

export async function approveRequest(id: string) {
  try {
    const response = await axios.put(API_ENDPOINTS.parkingRequests.approve(id), null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Parking request approved");
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to approve parking request";
    toast.error(errorMessage);
    throw error;
  }
}

export async function rejectRequest(id: string) {
  try {
    const response = await axios.put(API_ENDPOINTS.parkingRequests.reject(id), null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Parking request rejected");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to reject parking request";
    toast.error(errorMessage);
    throw error;
  }
}
