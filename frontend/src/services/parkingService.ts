import axios from "axios";
import API_ENDPOINTS from "../constants/api";

// Type definition for creating/updating parking
interface ParkingPayload {
  name: string;
  location: string;
  code: string;
  feePerHour: number;
}

// Fetch all parking areas
export const fetchParkings = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(API_ENDPOINTS.parking.all, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return response.data.data;
};

// Create a new parking
export const createParking = async (payload: ParkingPayload) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API_ENDPOINTS.parking.create, payload, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return response.data.data;
};

// Update existing parking
export const updateParking = async (id: string, payload: ParkingPayload) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${API_ENDPOINTS.parking.update}/${id}`, payload, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return response.data.data;
};

// Delete parking
export const deleteParking = async (id: string) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_ENDPOINTS.parking.delete}/${id}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};
