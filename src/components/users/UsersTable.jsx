import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getAllUserOverview } from "../../api/usersApi";
import ModernAGTable from "../tables/AGTable";
import ProductivityCell from "./ProductivityCell";

export default function UsersTable({ filters }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  // ✅ SAME helper you already use elsewhere
  const buildDateTime = (date, time, fallbackTime) => {
    if (!date) return null;
    const finalTime = time ? `${time}:00` : fallbackTime;
    return `${date}T${finalTime}`;
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setHasError(false);

      // ✅ ✅ ✅ THIS WAS MISSING — FILTER TRANSLATION
      const queryParams = {
        start_date: buildDateTime(
          filters.startDate,
          filters.startTime,
          "00:00:00"
        ),
        end_date: buildDateTime(
          filters.endDate,
          filters.endTime,
          "23:59:59"
        ),
        department: filters.department || null,
        agent_code: filters.user || null,
      };

      const res = await getAllUserOverview(queryParams);
      const u = res.data;

      if (!u || !Array.isArray(u.daily_activity)) {
        throw new Error("Invalid API response: daily_activity missing");
      }

      // ✅ One row per agent_id, latest day wins
      const userMap = new Map();

      u.daily_activity.forEach((item) => {
        if (!item.agent_id) return;

        const existing = userMap.get(item.agent_id);

        if (!existing || new Date(item.day) > new Date(existing.last_seen)) {
          userMap.set(item.agent_id, {
            agent_code: item.agent_id,
            name: item.name || "-",
            department: u.department || "-",
            last_seen: item.day,
            productivity: item.agent_id,
          });
        }
      });

      setUsers(Array.from(userMap.values()));
    } catch (err) {
      console.error(err);
      setHasError(true);
      toast.error("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Prevent AG Grid object type warnings
  const LoadingRow = [
    {
      agent_code: "Loading...",
      name: "Loading...",
      department: "Loading...",
      last_seen: "Loading...",
      productivity: null,
    },
  ];

  const ErrorRow = [
    {
      agent_code: "Error",
      name: "Error",
      department: "-",
      last_seen: "-",
      productivity: null,
    },
  ];

  const finalRows = loading ? LoadingRow : hasError ? ErrorRow : users;

  const columns = [
    { field: "agent_code", headerName: "Agent Code" },
    { field: "name", headerName: "Name" },
    { field: "department", headerName: "Department" },
    { field: "last_seen", headerName: "Last Seen" },
    {
      field: "productivity",
      headerName: "Productivity",
      minWidth: 150,
      cellRenderer: (params) => {
        if (!params.value || params.value === "ALL_USERS") {
          return <span className="text-gray-400">N/A</span>;
        }
        return <ProductivityCell agentCode={params.value} />;
      },
    },
  ];

  return (
    <ModernAGTable
      title="Users List"
      columns={columns}
      data={finalRows}
      onRowClick={(row) => navigate(`/users/${row.agent_code}`)}
    />
  );
}
