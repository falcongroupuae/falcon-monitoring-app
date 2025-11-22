import { useEffect, useState } from "react";
import { getDepartmentSummary } from "../../api/dashboardApi";
import AGTable from "../tables/AGTable";
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { formatDuration } from "../../utils/formatDuration";

export default function DepartmentSummaryTable({ filters }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchSummary();
  }, [filters]);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      setHasError(false);

      const res = await getDepartmentSummary(filters);

      if (!Array.isArray(res.data)) throw new Error("Invalid API response");

      const mapped = res.data.map((item) => ({
        department: item.department,
        agents: item.agents,
        events: item.events,
        active: formatDuration(item.active_seconds),
        idle: formatDuration(item.idle_seconds),
      }));

      setRows(mapped);
    } catch (err) {
      console.error(err);
      setHasError(true);
      toast.error("Failed to load department summary");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const LoadingRow = [
    {
      department: <FaSpinner className="animate-spin text-gray-500" />,
      agents: "...",
      events: "...",
      active: "...",
      idle: "...",
    },
  ];

  const ErrorRow = [
    {
      department: <FaExclamationTriangle className="text-red-500" />,
      agents: "Error",
      events: "-",
      active: "-",
      idle: "-",
    },
  ];

  const finalRows = loading ? LoadingRow : hasError ? ErrorRow : rows;

  return (
    <AGTable
      title="Department Summary"
      columns={["department", "agents", "events", "active", "idle"]}
      data={finalRows}
    />
  );
}
