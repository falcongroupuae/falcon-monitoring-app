import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getAllUserOverview } from "../../api/usersApi";
import { getSummary } from "../../api/dashboardApi";
import ModernAGTable from "../tables/AGTable";
import ProductivityCell from "./ProductivityCell";
import { formatDuration } from "../../utils/formatDuration";

export default function UsersTable({ filters }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const buildDateTime = (date, time, fallbackTime) => {
    if (!date) return null;
    const finalTime = time ? `${time}:00` : fallbackTime;
    return `${date}T${finalTime}`;
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setHasError(false);

      const baseParams = {
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

      // ✅ Load user identity from overview
      const res = await getAllUserOverview(baseParams);
      const u = res.data;

      if (!u || !Array.isArray(u.daily_activity)) {
        throw new Error("Invalid API response: daily_activity missing");
      }

      // ✅ Latest day per agent
      const userMap = new Map();

      u.daily_activity.forEach((item) => {
        if (!item.agent_id) return;

        const existing = userMap.get(item.agent_id);

        if (!existing || new Date(item.day) > new Date(existing.last_seen)) {
          userMap.set(item.agent_id, {
            agent_code: item.agent_id,
            name: item.name || "-",
            department: item.department || "-",
            last_seen: item.day,
            active_seconds: "Loading...",
            idle_seconds: "Loading...",
            productivity: item.agent_id,
          });
        }
      });

      const baseUsers = Array.from(userMap.values());

      // ✅ Load CORRECT active/idle from summary API
      const enrichedUsers = await Promise.all(
        baseUsers.map(async (user) => {
          try {
            const summaryRes = await getSummary({
              ...baseParams,
              agent_code: user.agent_code,
            });

            const s = summaryRes.data;

            return {
              ...user,
              active_seconds: formatDuration(s.active_seconds),
              idle_seconds: formatDuration(s.idle_seconds),
            };
          } catch {
            return {
              ...user,
              active_seconds: "-",
              idle_seconds: "-",
            };
          }
        })
      );

      setUsers(enrichedUsers);
    } catch (err) {
      console.error(err);
      setHasError(true);
      toast.error("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const LoadingRow = [
    {
      agent_code: "Loading...",
      name: "Loading...",
      department: "Loading...",
      active_seconds: "Loading...",
      idle_seconds: "Loading...",
      productivity: null,
    },
  ];

  const ErrorRow = [
    {
      agent_code: "Error",
      name: "Error",
      department: "-",
      active_seconds: "-",
      idle_seconds: "-",
      productivity: null,
    },
  ];

  const finalRows = loading ? LoadingRow : hasError ? ErrorRow : users;

  const columns = [
    { field: "agent_code", headerName: "Agent Code" },
    { field: "name", headerName: "Name" },
    { field: "department", headerName: "Department" },
    { field: "active_seconds", headerName: "Active" },
    { field: "idle_seconds", headerName: "Idle" },
    {
      field: "productivity",
      headerName: "Productivity",
      minWidth: 150,
      cellRenderer: (params) =>
        !params.value || params.value === "ALL_USERS" ? (
          <span className="text-gray-400">N/A</span>
        ) : (
          <ProductivityCell agentCode={params.value} />
        ),
    },
  ];

  return (
    <ModernAGTable
      title="Users List"
      columns={columns}
      data={finalRows}
      onRowClick={(row) =>
        navigate(`/users/${row.agent_code}`, {
          state: { filters }, // ✅ PASS GLOBAL FILTER TO DETAIL PAGE
        })
      }
    />
  );
}
