import { FaUsers, FaDollarSign, FaChartLine, FaPercentage } from "react-icons/fa";
import { StatsCard } from "../components/charts/StatsCard";
import { BarChartCard } from "../components/charts/BarChartCard";
import { LineChartCard } from "../components/charts/LineChartCard";
import Filter from "../components/common/Filter";
import Table from "../components/tables/Table";
import { PieChartCard } from "../components/charts/PieChartCard";

export default function Dashboard() {
  const columns = [
    "ID", "AgentId", "Department", "EventType", 
    "Browser", "URL", "Title", "IdleSeconds", "TimeStamp"
  ];
  
  const dummyData = [
    { ID: 1, AgentId: "A001", Department: "IT", EventType: "login", Browser: "Chrome", URL: "/dashboard", Title: "Dashboard", IdleSeconds: 120, TimeStamp: "2025-10-01 12:00:00" },
    { ID: 2, AgentId: "A002", Department: "HR", EventType: "logout", Browser: "Firefox", URL: "/profile", Title: "Profile", IdleSeconds: 300, TimeStamp: "2025-10-01 12:05:00" },
    { ID: 3, AgentId: "A003", Department: "Sales", EventType: "click", Browser: "Safari", URL: "/reports", Title: "Reports", IdleSeconds: 60, TimeStamp: "2025-10-01 12:10:00" },
    { ID: 4, AgentId: "A004", Department: "Finance", EventType: "view", Browser: "Edge", URL: "/analytics", Title: "Analytics", IdleSeconds: 180, TimeStamp: "2025-10-01 12:15:00" },
   
  ];

  // Chart data
  const departmentData = [
    { name: "IT", value: 400 },
    { name: "HR", value: 300 },
    { name: "Sales", value: 300 },
    { name: "Finance", value: 200 },
  ];

  const eventTypeData = [
    { month: "Jan", login: 65, logout: 45, click: 80 },
    { month: "Feb", login: 59, logout: 50, click: 75 },
    { month: "Mar", login: 80, logout: 60, click: 85 },
    { month: "Apr", login: 81, logout: 55, click: 90 },
    { month: "May", login: 56, logout: 48, click: 70 },
    { month: "Jun", login: 55, logout: 52, click: 78 },
  ];

  const browserData = [
    { day: "Mon", Chrome: 120, Firefox: 80, Safari: 60, Edge: 40 },
    { day: "Tue", Chrome: 130, Firefox: 85, Safari: 65, Edge: 45 },
    { day: "Wed", Chrome: 115, Firefox: 90, Safari: 70, Edge: 50 },
    { day: "Thu", Chrome: 140, Firefox: 95, Safari: 75, Edge: 55 },
    { day: "Fri", Chrome: 125, Firefox: 88, Safari: 68, Edge: 48 },
    { day: "Sat", Chrome: 100, Firefox: 70, Safari: 55, Edge: 35 },
    { day: "Sun", Chrome: 90, Firefox: 65, Safari: 50, Edge: 30 },
  ];

  const pieColors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  const handleApply = (filters) => {
    console.log("Filters applied:", filters);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard title="Total Users" value="1,234" change="+12%" icon={<FaUsers />} />
        <StatsCard title="Total Events" value="8,562" change="+8%" icon={<FaChartLine />} />
        <StatsCard title="Active Sessions" value="573" change="+24%" icon={<FaDollarSign />} />
        <StatsCard title="Avg Idle Time" value="145s" change="-5%" icon={<FaPercentage />} />
      </div>

      {/* Filters */}
      <Filter onApply={handleApply} />

      {/* Tables Grid - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Table title="Reports Table" columns={columns} data={dummyData} />
        <PieChartCard
          title="Department Distribution" 
          data={departmentData} 
          colors={pieColors} 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Table title="User Table" columns={columns} data={dummyData} />
        <BarChartCard
          title="Event Types by Month" 
          data={eventTypeData} 
          dataKeys={{ xAxis: "month", bars: ["login", "logout", "click"] }} 
        />
      </div>


      {/* Line Chart - Full Width */}
      <div className="mb-6">
        <LineChartCard
          title="Browser Usage Trends" 
          data={browserData} 
          dataKeys={{ xAxis: "day", lines: ["Chrome", "Firefox", "Safari", "Edge"] }} 
        />
      </div>
      {/* Another row of tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Table title="Activity Table" columns={columns} data={dummyData} />
        <Table title="Analytics Table" columns={columns} data={dummyData} />
      </div>
    </div>
  );
}