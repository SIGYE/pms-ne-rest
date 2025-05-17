import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../components/tables";
import {
  requestColumns,
  Requests,
} from "../../components/tables/columns";
import API_ENDPOINTS from "../../constants/api";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import Loader from "../../components/commons/loader";
import CreateEditRequest from "../../components/modals/request/createEditRequest";
import {
  approveRequest,
  deleteRequest,
  rejectRequest,
} from "../../services/requestService";

const RequestPage: React.FC = () => {
  const [requests, setRequests] = useState<Requests[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Requests | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table"); // Toggle state

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const UserRole = parsedUser.role?.toLowerCase();

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      let response;

      if (UserRole === "admin") {
        response = await axios.get(API_ENDPOINTS.parkingRequests.all, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
      } else {
        response = await axios.get(API_ENDPOINTS.parkingRequests.mine, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
      }

      const { data } = response;
      setRequests(data);
    } catch (err) {
      console.error("Request fetch error:", err);
      setError("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (request: Requests) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const handleCreateRequest = () => {
    setSelectedRequest(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (request: Requests) => {
    try {
      await deleteRequest(request.id || "");
      toast.success("Request deleted successfully");
      fetchRequests();
    } catch {
      toast.error("Failed to delete request");
    }
  };

  const handleSuccess = () => {
    fetchRequests();
  };

  const handleApprove = async (id: string) => {
    try {
      await approveRequest(id);
    } catch (error) {
      console.error(error);
    } finally {
      fetchRequests();
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectRequest(id);
    } catch (error) {
      console.error(error);
    } finally {
      fetchRequests();
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">
          {UserRole === "admin"
            ? "All Requests"
            : UserRole === "user"
            ? "My Requests"
            : "Requests"}
        </h1>

        <div className="flex gap-2">
          {/* User Create Request Button */}
          {UserRole === "user" && (
            <Button onClick={handleCreateRequest}>Create Request</Button>
          )}

          {/* View toggle buttons */}
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

      {/* Error Message */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Loader or Content */}
      {loading ? (
        <Loader />
      ) : viewMode === "table" ? (
        <DataTable<Requests>
          data={requests}
          columns={requestColumns()}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onApprove={handleApprove}
          onReject={handleReject}
          role={UserRole}
          tableType="requests"
        />
      ) : (
        // Grid / Card View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-blue-800 mb-1">
                Request #{req.id}
              </h3>
              <p className="text-sm">
                Vehicle ID: <strong>{req.vehicleId}</strong>
              </p>
              <p className="text-sm">
                Check-In:{" "}
                <span className="text-gray-700">{req.checkIn || "N/A"}</span>
              </p>
              <p className="text-sm">
                Check-Out:{" "}
                <span className="text-gray-700">{req.checkOut || "N/A"}</span>
              </p>
              <p className="text-sm mt-2">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    req.status === "approved"
                      ? "text-green-600"
                      : req.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {req.status?.toUpperCase()}
                </span>
              </p>
              <div className="mt-4 flex flex-wrap gap-2 justify-end">
                <Button onClick={() => handleEdit(req)} variant="outline">
                  Edit
                </Button>
                {UserRole === "admin" && req.status === "pending" && (
                  <>
                    <Button onClick={() => handleApprove(req.id || "")}>
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(req.id || "")}
                      variant="destructive"
                    >
                      Reject
                    </Button>
                  </>
                )}
                <Button
                  onClick={() => handleDelete(req)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Request Modal */}
      <CreateEditRequest
        isOpen={isDialogOpen}
        requestToEdit={
          selectedRequest?.checkIn && selectedRequest?.checkOut
            ? {
                id: selectedRequest.id,
                vehicleId: selectedRequest.vehicleId,
                checkIn: selectedRequest.checkIn,
                checkOut: selectedRequest.checkOut,
              }
            : null
        }
        onOpenChange={setIsDialogOpen}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default RequestPage;
