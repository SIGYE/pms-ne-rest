// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "sonner";
// import { Parking } from "../../types/parking";
// import DataTable from "../../components/tables";
// import { parkingColumns } from "../../components/tables/columns";
// import API_ENDPOINTS from "../../constants/api";
// import { Button } from "../../components/ui/button";
// import Loader from "../../components/commons/loader";
// import CreateEditParking from "../../components/modals/parking/createEditParking";
// import { deleteParking } from "../../services/parkingService";

// const ParkingPage: React.FC = () => {
//   const [parkings, setParkings] = useState<Parking[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedParking, setSelectedParking] = useState<Parking | null>(null);
//   const [viewMode, setViewMode] = useState<"grid" | "table">("table");

//   const user = localStorage.getItem("user");
//   const parsedUser = user ? JSON.parse(user) : {};
//   const UserRole = parsedUser.role?.toLowerCase();

//   const fetchParkings = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(API_ENDPOINTS.parking.all, {
//         headers: {
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//       });

//       const { data } = response.data;
//       console.log("Fetched parkings:", data);
//       setParkings(data);
//     } catch (err) {
//       console.error("Parking fetch error:", err);
//       setError("Failed to fetch parkings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (parking: Parking) => {
//     setSelectedParking(parking);
//     setIsDialogOpen(true);
//   };

//   const handleCreateParking = () => {
//     setSelectedParking(null);
//     setIsDialogOpen(true);
//   };

//   const handleDelete = async (parking: Parking) => {
//     try {
//       await deleteParking(parking.id);
//       toast.success("Parking deleted successfully");
//       fetchParkings();
//     } catch {
//       toast.error("Failed to delete parking");
//     }
//   };

//   const handleSuccess = () => {
//     fetchParkings();
//   };

//   useEffect(() => {
//     fetchParkings();
//   }, []);

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-semibold">Parkings</h1>

//         {UserRole === "admin" && (
//           <div className="flex gap-2">
//             <Button onClick={handleCreateParking}>Create Parking</Button>
//             <Button
//               variant={viewMode === "table" ? "default" : "outline"}
//               onClick={() => setViewMode("table")}
//             >
//               Table View
//             </Button>
//             <Button
//               variant={viewMode === "grid" ? "default" : "outline"}
//               onClick={() => setViewMode("grid")}
//             >
//               Grid View
//             </Button>
//           </div>
//         )}
//       </div>

//       {error && <p className="text-red-600 mb-4">{error}</p>}

//       {loading ? (
//         <Loader />
//       ) : viewMode === "table" ? (
//         <DataTable<Parking>
//           data={parkings}
//           columns={parkingColumns()}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           role={UserRole}
//           tableType="parkings"
//         />
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {parkings.map((parking) => (
//             <div
//               key={parking.id}
//               className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition"
//             >
//               <h3 className="text-lg font-bold text-blue-800">{parking.name}</h3>
//               <p className="text-sm text-gray-600">Code: {parking.code}</p>
//               <p className="text-sm text-gray-700 mt-1">
//                 Location: <span className="font-medium">{parking.location}</span>
//               </p>
//               <p className="text-sm text-gray-700 mt-1">
//                 Fee per Hour:{" "}
//                 <span className="text-blue-600 font-semibold">
//                   Frw {parking.feePerHour}
//                 </span>
//               </p>
//               <p className="text-sm text-gray-700 mt-1">
//                 Total Slots:{" "}
//                 <span className="font-semibold">{parking.slots?.length ?? 0}</span>
//               </p>
//               <div className="mt-4 flex justify-end gap-2">
//                 <Button onClick={() => handleEdit(parking)} variant="outline">
//                   Edit
//                 </Button>
//                 <Button onClick={() => handleDelete(parking)} variant="destructive">
//                   Delete
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <CreateEditParking
//         isOpen={isDialogOpen}
//         parkingToEdit={selectedParking}
//         onOpenChange={setIsDialogOpen}
//         onSuccess={handleSuccess}
//       />
//     </div>
//   );
// };

// export default ParkingPage;
