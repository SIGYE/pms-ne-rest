import React, { useEffect, useState } from "react";
// UI components for cards
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../src/components/ui/card";

// Services to fetch data from your backend
import { getAllUsers } from "../../services/userService"; 
import { getAllSlots } from "../../services/slotService";

// Type definitions
import { Slots, Users } from "../../components/tables/columns";

// Recharts components for bar chart
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardPage: React.FC = () => {
  // States for storing data counts
  const [userCount, setUserCount] = useState<number>(0);
  const [slotCount, setSlotCount] = useState<number>(0);
  const [availableSlots, setAvailableSlots] = useState<number>(0);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users and filter only those with role 'USER'
        const userData = await getAllUsers();
        const filteredUserData = userData.filter((user: Users) => user.role === "USER");
        setUserCount(filteredUserData.length); 

        // Fetch all slots and count total
        const slotData = await getAllSlots();
        setSlotCount(slotData.data.length);

        // Filter slots that are available
        const availableSlots = slotData.data.filter((slot: Slots) => slot.isAvailable === true);
        setAvailableSlots(availableSlots.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Bar chart data structure
  const data = [
    { name: "Users", count: userCount },
    { name: "Total Slots", count: slotCount },
    { name: "Available Slots", count: availableSlots },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-black">Dashboard Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users */}
        <Card>
          <CardHeader>
            <CardTitle>Number of Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-black">{userCount}</p>
          </CardContent>
        </Card>

        {/* Total Slots */}
        <Card>
          <CardHeader>
            <CardTitle>Number of Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-black">{slotCount}</p>
          </CardContent>
        </Card>

        {/* Available Slots */}
        <Card>
          <CardHeader>
            <CardTitle>Available Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-black">{availableSlots}</p>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart Visualization */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-black mb-4">Analytics Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#1e5e8a" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
