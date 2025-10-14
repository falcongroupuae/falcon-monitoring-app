import { useEffect, useState } from "react";
import { FaUsers, FaClock, FaGlobe, FaChartLine } from "react-icons/fa";
import { StatsCard } from "../charts/StatsCard";
import { getSummary } from "../../api/dashboardApi";

export default function SummaryCards({ filters }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, [filters]);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await getSummary(filters);
      setSummary(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load summary");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading summary...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatsCard title="Total Events" value={summary?.total_events} icon={<FaChartLine />} />
      <StatsCard title="Total Agents" value={summary?.total_agents} icon={<FaUsers />} />
      <StatsCard title="Total Idle (s)" value={summary?.total_idle_time} icon={<FaClock />} />
      <StatsCard title="Total Sites Time (s)" value={summary?.total_site_time} icon={<FaGlobe />} />
    </div>
  );
}
