import { useState } from "react";
import Filter from "../components/common/Filter";
import SummaryCards from "../components/dashboard/SummaryCards";
import TopSitesTable from "../components/dashboard/TopSitesTable";
import UserDailyTable from "../components/dashboard/UserDailyTable";
import DepartmentSummaryTable from "../components/dashboard/DepartmentSummaryTable";
import LeastProductiveUsersTable from "../components/dashboard/LeastProductiveUsersTable";
import TopAppsPieChart from "../components/dashboard/TopAppsPieChart";


export default function Dashboard() {
  const [filters, setFilters] = useState({});

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
 <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>

      <Filter onApply={handleApplyFilters} />

      <SummaryCards filters={filters} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TopSitesTable filters={filters} />
        <TopAppsPieChart filters={filters} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <UserDailyTable filters={filters} />
        <DepartmentSummaryTable filters={filters} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
        <LeastProductiveUsersTable filters={filters} />
      </div>
    </div>
  );
}
