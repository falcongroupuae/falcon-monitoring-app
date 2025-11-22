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

      const limit = filters?.limit || 10;
      const res = await getLeastProductiveUsers(limit);

      if (!Array.isArray(res.data)) throw new Error("Invalid API response");

      // Sort by idle_ratio DESC
      const sorted = [...res.data].sort(
        (a, b) => b.idle_ratio - a.idle_ratio
      );

      // Map for the table
      const mapped = sorted.map((item, index) => ({
        rank: index + 1,
        agent_id: item.agent_id,
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
      agent_id: "...",
      events: "...",
      active: "...",
      idle: "...",
      idle_ratio: "...",
    },
  ];

  const ErrorRow = [
    {
      rank: <FaExclamationTriangle className="text-red-500" />,
      agent_id: "Error",
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
      columns={["rank", "agent_id", "events", "active", "idle", "idle_ratio"]}
      data={finalRows}
    />
  );
}
