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
      };

      console.log("📡 UserDaily params:", queryParams);

      const res = await getUserDaily(queryParams);

      if (!Array.isArray(res.data)) {
        throw new Error("Invalid API response format");
      }

      const mapped = res.data.map((item) => ({
        agent_id: item.agent_id,
        name: item.name,
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
      name: <FaSpinner className="animate-spin text-gray-500" />,
      day: <FaSpinner className="animate-spin text-gray-500" />,
      events: <FaSpinner className="animate-spin text-gray-500" />,
      active: <FaSpinner className="animate-spin text-gray-500" />,
      idle: <FaSpinner className="animate-spin text-gray-500" />,
    },
  ];

  // Error row
  const ErrorRow = [
    {
      name: <FaExclamationTriangle className="text-red-500" />,
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
      columns={["name", "day", "events", "active", "idle"]}
      data={finalData}
    />
  );
}
