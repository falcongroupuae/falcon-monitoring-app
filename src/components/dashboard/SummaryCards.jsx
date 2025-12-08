import { useEffect, useState } from "react";
import {
  FaUsers,
  FaClock,
  FaGlobe,
  FaChartLine,
  FaBuilding,
  FaSpinner,
  FaExclamationTriangle,
  FaBusinessTime,
} from "react-icons/fa";
import { StatsCard } from "../charts/StatsCard";
import { getSummary } from "../../api/dashboardApi";
import { formatDuration } from "../../utils/formatDuration";
import { toast } from "react-hot-toast";

export default function SummaryCards({ filters }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchSummary();
  }, [filters]);

  const fetchSummary = async () => {
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

      const res = await getSummary(queryParams);

      if (!res?.data) throw new Error("Invalid API response");

      setSummary(res.data);
    } catch (err) {
      console.error(err);
      setHasError(true);
      toast.error("Failed to load summary data");
    } finally {
      setLoading(false);
    }
  };

  const LoadingIcon = (
    <FaSpinner className="animate-spin text-gray-500 dark:text-gray-400 text-lg" />
  );

  const ErrorIcon = (
    <FaExclamationTriangle className="text-red-500 text-lg" />
  );

  const renderCardValue = (raw) => {
    if (loading) return LoadingIcon;
    if (hasError) return ErrorIcon;
    return raw;
  };

  const renderTimeValue = (seconds) => {
    if (loading) return LoadingIcon;
    if (hasError) return ErrorIcon;
    return formatDuration(seconds);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <StatsCard
        title="Total Events"
        value={renderCardValue(summary?.events)}
        icon={<FaChartLine />}
      />

      <StatsCard
        title="Active Time"
        value={renderTimeValue(summary?.active_seconds)}
        icon={<FaBusinessTime />}
      />

      <StatsCard
        title="Total Agents"
        value={renderCardValue(summary?.agents)}
        icon={<FaUsers />}
      />

      <StatsCard
        title="Total Departments"
        value={renderCardValue(summary?.departments)}
        icon={<FaBuilding />}
      />

      <StatsCard
        title="Idle Time"
        value={renderTimeValue(summary?.idle_seconds)}
        icon={<FaClock />}
      />

      <StatsCard
        title="Sites Total Time"
        value={renderTimeValue(summary?.total_span_seconds)}
        icon={<FaGlobe />}
      />
    </div>
  );
}
