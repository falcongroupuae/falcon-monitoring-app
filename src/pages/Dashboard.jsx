import { useState } from "react";
import Filter from "../components/common/Filter";
import SummaryCards from "../components/dashboard/SummaryCards";
// import AgentSummaryTable from "../components/dashboard/AgentSummaryTable";
// import ActivityTrendChart from "../components/dashboard/ActivityTrendChart";
import SitesPieChart from "../components/dashboard/SitesPieChart";
import TopAppsTable from "../components/dashboard/TopAppsTable";
// import TopSitesTable from "../components/dashboard/TopSitesTable";
// import IdleTimeChart from "../components/dashboard/IdleTimeChart.JSX";
import UserDailyTable from "../components/dashboard/UserDailyTable";
import DepartmentSummaryTable from "../components/dashboard/DepartmentSummaryTable";
import LeastProductiveUsersTable from "../components/dashboard/LeastProductiveUsersTable";

export default function Dashboard() {
  const [filters, setFilters] = useState({});

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="p-6 bg-gray-50 max-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>

      <Filter onApply={handleApplyFilters} />

      <SummaryCards filters={filters} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TopAppsTable filters={filters} />
        <SitesPieChart filters={filters} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <UserDailyTable filters={filters} />
        <DepartmentSummaryTable filters={filters} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
        <LeastProductiveUsersTable filters={filters} />
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ActivityTrendChart filters={filters} />
        <IdleTimeChart />
      </div> */}
    </div>
  );
}
