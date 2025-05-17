import DataTable from "../../components/tables";
import { getAllUsers } from "../../services/userService";
import { useEffect, useState } from "react";
import { userColumns, Users } from "../../components/tables/columns";

export default function UserPage() {
  const [users, setUsers] = useState<Users[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  useEffect(() => {
    const getAll = async () => {
      const response = await getAllUsers();
      setUsers(response);
    };
    getAll();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg ${viewMode === "table" ? "bg-black text-white" : "border"}`}
            onClick={() => setViewMode("table")}
          >
            Table View
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${viewMode === "grid" ? "bg-black text-white" : "border"}`}
            onClick={() => setViewMode("grid")}
          >
            Card View
          </button>
        </div>
      </div>

      {viewMode === "table" ? (
        <DataTable<Users> data={users} columns={userColumns()} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{user.names}</h2>
              <p className="text-sm text-gray-600">Email: {user.email}</p>
              <p className="text-sm text-gray-600">Role: {user.role}</p>
              {/* Add more user fields here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
