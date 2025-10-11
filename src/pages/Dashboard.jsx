import {
  FaUsers,
  FaDollarSign,
  FaChartLine,
  FaPercentage,
  FaClock,
  FaGlobe,
} from "react-icons/fa";
import { StatsCard } from "../components/charts/StatsCard";
import { LineChartCard } from "../components/charts/LineChartCard";
import Filter from "../components/common/Filter";
import Table from "../components/tables/Table";
import { PieChartCard } from "../components/charts/PieChartCard";

export default function Dashboard() {
  // DASHBOARD SUMMARY
  const totalStats = {
    total_events: 3054,
    total_agents: 5,
    total_idle_seconds: 491759,
    total_sites: 17,
  };

  // AGENT SUMMARY
  const agentColumns = [
    "agent_id",
    "department",
    "total_events",
    "total_idle",
    "total_active",
  ];
  const agentRows = [
    {
      agent_id: "DESKTOP-00-51",
      department: "Purchase",
      total_events: 267,
      total_idle: 587,
      total_active: null,
    },
    {
      agent_id: "Mohammed",
      department: "Productivity Monitoring",
      total_events: 535,
      total_idle: 90192,
      total_active: null,
    },
    {
      agent_id: "Ansil",
      department: "Digital Marketing",
      total_events: 934,
      total_idle: 225254,
      total_active: 50791,
    },
    {
      agent_id: "Yadu",
      department: "Purchase",
      total_events: 989,
      total_idle: 157553,
      total_active: 34518,
    },
    {
      agent_id: "Adrita",
      department: "Digital Marketing",
      total_events: 317,
      total_idle: 16423,
      total_active: 11990,
    },
  ];

  // APP COUNT
  const appColumns = ["app_name", "launches", "total_duration"];
  const appRows = [
    { app_name: "pgadmin4.exe", launches: 12, total_duration: null },
    { app_name: "explorer.exe", launches: 180, total_duration: 55066 },
    { app_name: "chrome.exe", launches: 290, total_duration: 20675 },
    { app_name: "dwm.exe", launches: 1, total_duration: 19138 },
    { app_name: "code.exe", launches: 149, total_duration: 2327 },
    { app_name: "chrome", launches: 675, total_duration: 1963 },
    { app_name: "excel.exe", launches: 65, total_duration: 861 },
    { app_name: "applicationframehost.exe", launches: 33, total_duration: 440 },
    { app_name: "winword.exe", launches: 17, total_duration: 294 },
    { app_name: "acrobat.exe", launches: 29, total_duration: 146 },
    { app_name: "taskmgr.exe", launches: 8, total_duration: 92 },
    { app_name: "ultraviewer_desktop.exe", launches: 10, total_duration: 66 },
    { app_name: "msedge.exe", launches: 3, total_duration: 48 },
    { app_name: "photos.exe", launches: 12, total_duration: 34 },
    { app_name: "edge", launches: 4, total_duration: 32 },
    { app_name: "lockapp.exe", launches: 3, total_duration: 4 },
  ];

  // HOURLY TREND (for Line Chart)
  const hourlyTrend = [
    {
      hour: "2025-10-09 08:00:00",
      total_events: 26,
      total_active_seconds: null,
    },
    {
      hour: "2025-10-09 09:00:00",
      total_events: 22,
      total_active_seconds: null,
    },
    {
      hour: "2025-10-09 10:00:00",
      total_events: 41,
      total_active_seconds: null,
    },
    {
      hour: "2025-10-09 11:00:00",
      total_events: 60,
      total_active_seconds: null,
    },
    {
      hour: "2025-10-09 12:00:00",
      total_events: 15,
      total_active_seconds: null,
    },
    {
      hour: "2025-10-09 16:00:00",
      total_events: 66,
      total_active_seconds: null,
    },
    {
      hour: "2025-10-09 17:00:00",
      total_events: 812,
      total_active_seconds: null,
    },
    {
      hour: "2025-10-10 08:00:00",
      total_events: 38,
      total_active_seconds: null,
    },
    {
      hour: "2025-10-10 09:00:00",
      total_events: 254,
      total_active_seconds: null,
    },
    {
      hour: "2025-10-10 10:00:00",
      total_events: 72,
      total_active_seconds: null,
    },
    {
      hour: "2025-10-10 15:00:00",
      total_events: 413,
      total_active_seconds: 19558,
    },
    {
      hour: "2025-10-10 16:00:00",
      total_events: 771,
      total_active_seconds: 122368,
    },
    {
      hour: "2025-10-10 17:00:00",
      total_events: 456,
      total_active_seconds: 228472,
    },
  ];

  // SITES VISITED
  const siteColumns = ["domain", "visits", "total_duration"];
  const siteRows = [
    { domain: "localhost:5173", visits: 39, total_duration: 8649 },
    { domain: "outlook.office.com", visits: 118, total_duration: 7692 },
    { domain: "mail.google.com", visits: 12, total_duration: 4701 },
    { domain: "google.com", visits: 8, total_duration: 4394 },
    { domain: "falconlabuae.com", visits: 102, total_duration: 3644 },
    { domain: "chatgpt.com", visits: 13, total_duration: 2217 },
    { domain: "semrush.com", visits: 36, total_duration: 1162 },
    {
      domain: "falcon-monitoring-app.vercel.app",
      visits: 11,
      total_duration: 840,
    },
    { domain: "freepik.com", visits: 12, total_duration: 494 },
    { domain: "creative-tim.com", visits: 9, total_duration: 260 },
    { domain: "remove.bg", visits: 6, total_duration: 216 },
    { domain: "stackoverflow.com", visits: 2, total_duration: 55 },
  ];

  const handleApply = (filters) => {
    console.log("Filters applied:", filters);
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
      </div>

      <Filter onApply={handleApply} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Events"
          value={totalStats.total_events}
          icon={<FaChartLine />}
        />
        <StatsCard
          title="Total Agents"
          value={totalStats.total_agents}
          icon={<FaUsers />}
        />
        <StatsCard
          title="Total Idle (s)"
          value={totalStats.total_idle_seconds}
          icon={<FaClock />}
        />
        <StatsCard
          title="Total Sites"
          value={totalStats.total_sites}
          icon={<FaGlobe />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
        <Table title="Agent Summary" columns={agentColumns} data={agentRows} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LineChartCard
          title="Hourly Trend of Events"
          data={hourlyTrend}
          dataKeys={{
            xAxis: "hour",
            lines: ["total_events", "total_active_seconds"],
          }}
        />
        <PieChartCard
          title="Sites Visits Distribution"
          data={siteRows.map((site) => ({
            name: site.domain,
            value: site.visits,
          }))}
          colors={[
            "#3B82F6",
            "#10B981",
            "#F59E0B",
            "#EF4444",
            "#8B5CF6",
            "#EC4899",
            "#14B8A6",
            "#6366F1",
            "#F97316",
            "#84CC16",
            "#0EA5E9",
            "#EAB308",
            "#F43F5E",
            "#22C55E",
            "#A855F7",
            "#06B6D4",
            "#D946EF",
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Table title="App Count" columns={appColumns} data={appRows} />
        <Table title="Sites Visited" columns={siteColumns} data={siteRows} />
      </div>
    </div>
  );
}
