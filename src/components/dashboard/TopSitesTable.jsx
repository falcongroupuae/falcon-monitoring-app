import { useEffect, useState } from "react";
import { getTopSites } from "../../api/dashboardApi";
import AGTable from "../tables/AGTable";
import { toast } from "react-hot-toast";
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";

export default function TopSitesTable({ filters }) {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchSites();
  }, [filters]);

  const fetchSites = async () => {
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

      const res = await getTopSites(queryParams);

      if (!Array.isArray(res.data)) {
        throw new Error("Invalid API response format");
      }

      const mappedData = res.data.map((item) => ({
        window_title: item.name || "Unknown",
        count: item.count ?? 0,
      }));

      setSites(mappedData);
    } catch (err) {
      console.error(err);
      setHasError(true);
      toast.error("Failed to load top sites");
      setSites([]);
    } finally {
      setLoading(false);
    }
  };

  const LoadingRow = [
    {
      window_title: (
        <FaSpinner className="animate-spin text-gray-500 dark:text-gray-400" />
      ),
      count: "...",
    },
  ];

  const ErrorRow = [
    {
      window_title: (
        <FaExclamationTriangle className="text-red-500 dark:text-red-400" />
      ),
      count: "Error",
    },
  ];

  const finalData = loading ? LoadingRow : hasError ? ErrorRow : sites;

  return (
    <AGTable
      title="Top Sites / Active Windows"
      columns={["window_title", "count"]}
      data={finalData}
    />
  );
}
