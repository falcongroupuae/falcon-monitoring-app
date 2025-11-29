import { useEffect, useState } from "react";
import { getLeastProductiveUsers } from "../../api/dashboardApi";
import AGTable from "../tables/AGTable";
import { toast } from "react-hot-toast";
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { formatDuration } from "../../utils/formatDuration";

export default function LeastProductiveUsersTable({ filters }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setHasError(false);

      const buildDateTime = (date, time, fallbackTime) => {
        if (!date) return null;
        const finalTime = time ? `${time}:00` : fallbackTime;
        return `${date}T${finalTime}`;
      };

      const queryParams = {
        start_date: buildDateTime(
          filters.startDate,
          filters.startTime,
          "00:00:00"
        ),
        end_date: buildDateTime(filters.endDate, filters.endTime, "23:59:59"),
        department: filters.department || null,
        agent_code: filters.user || null,
        limit: 10,
      };

      const res = await getLeastProductiveUsers(queryParams);

      if (!Array.isArray(res.data)) throw new Error("Invalid API response");

      // Sort by idle ratio DESC
      const sorted = [...res.data].sort((a, b) => b.idle_ratio - a.idle_ratio);

      const mapped = sorted.map((item, index) => ({
        rank: index + 1,
        name: item.name,
        events: item.events,
        active: formatDuration(item.active_seconds),
        idle: formatDuration(item.idle_seconds),
        idle_ratio: item.idle_ratio.toFixed(2) + "x",
      }));

      setRows(mapped);
    } catch (err) {
      console.error(err);
      setHasError(true);
      toast.error("Failed to load least productive users");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const LoadingRow = [
    {
      rank: <FaSpinner className="animate-spin text-gray-500" />,
      name: "...",
      events: "...",
      active: "...",
      idle: "...",
      idle_ratio: "...",
    },
  ];

  const ErrorRow = [
    {
      rank: <FaExclamationTriangle className="text-red-500" />,
      name: "Error",
      events: "-",
      active: "-",
      idle: "-",
      idle_ratio: "-",
    },
  ];

  const finalRows = loading ? LoadingRow : hasError ? ErrorRow : rows;

  return (
    <AGTable
      title="Least Productive Users"
      columns={["rank", "name", "events", "active", "idle", "idle_ratio"]}
      data={finalRows}
    />
  );
}
