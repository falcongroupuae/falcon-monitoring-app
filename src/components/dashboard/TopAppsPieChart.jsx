import { useEffect, useState } from "react";
import { PieChartCard } from "../charts/PieChartCard";
import { getTopApps } from "../../api/dashboardApi";
import { toast } from "react-hot-toast";
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";

export default function TopAppsPieChart({ filters }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchApps();
  }, [filters]);

  const fetchApps = async () => {
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


      const res = await getTopApps(queryParams);

      if (!Array.isArray(res.data)) {
        throw new Error("Invalid API response format");
      }

      const chartData = res.data.map((item) => ({
        name: item.name,
        value: item.count,
      }));

      setApps(chartData);
    } catch (err) {
      console.error(err);
      setHasError(true);
      toast.error("Failed to load top apps chart");
    } finally {
      setLoading(false);
    }
  };

  // Loading view inside card
  if (loading) {
    return (
      <div className="flex items-center justify-center h-56 bg-white rounded-xl shadow border">
        <FaSpinner className="animate-spin text-gray-500 text-2xl" />
      </div>
    );
  }

  // Error view inside card
  if (hasError) {
    return (
      <div className="flex items-center justify-center bg-white rounded-xl shadow border text-red-500 gap-2">
        <FaExclamationTriangle className="text-xl" />
        <span>Error loading top apps</span>
      </div>
    );
  }

  return <PieChartCard title="Top Apps Usage" data={apps} />;
}
