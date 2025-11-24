import { useEffect, useState } from "react";
import { getUserDaily } from "../../api/dashboardApi";
import AGTable from "../tables/AGTable";
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { formatDuration } from "../../utils/formatDuration";

export default function UserDailyTable({ filters }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchDaily();
  }, [filters]);

  const fetchDaily = async () => {
    try {
      setLoading(true);
      setHasError(false);

      const res = await getUserDaily(filters);

      if (!Array.isArray(res.data)) {
        throw new Error("Invalid API response format");
      }

      // Map API → table format
      const mapped = res.data.map((item) => ({
        agent_id: item.agent_id,
        day: item.day,
        events: item.events,
        active: formatDuration(item.active_seconds),
        idle: formatDuration(item.idle_seconds),
      }));

      setRows(mapped);
    } catch (err) {
      console.error(err);
      setHasError(true);
      toast.error("Failed to load user daily activity");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  // Loading row
  const LoadingRow = [
    {
      agent_id: <FaSpinner className="animate-spin text-gray-500" />,
      day: "...",
      events: "...",
      active: "...",
      idle: "...",
    },
  ];

  // Error row
  const ErrorRow = [
    {
      agent_id: <FaExclamationTriangle className="text-red-500" />,
      day: "Error",
      events: "-",
      active: "-",
      idle: "-",
    },
  ];

  const finalData = loading ? LoadingRow : hasError ? ErrorRow : rows;

  return (
    <AGTable
      title="User Daily Activity"
      columns={["agent_id", "day", "events", "active", "idle"]}
      data={finalData}
    />
  );
}
