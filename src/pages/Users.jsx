import { useState } from "react";
import Filter from "../components/common/Filter";
import UsersTable from "../components/users/UsersTable";

export default function Users() {
  const [filters, setFilters] = useState({});

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Users
      </h1>

      <Filter onApply={handleApplyFilters} />

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8 auto-rows-max">
        <UsersTable filters={filters} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8 auto-rows-max">
        {/* <LeastProductiveUsersTable filters={filters}/> */}
      </div>
    </div>
  );
}
