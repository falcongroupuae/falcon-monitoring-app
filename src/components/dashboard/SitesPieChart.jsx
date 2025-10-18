import { useEffect, useState } from "react";
import { PieChartCard } from "../charts/PieChartCard";
import { getTopSites } from "../../api/dashboardApi";

export default function SitesPieChart({ filters }) {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSites();
  }, [filters]);

  const fetchSites = async () => {
    try {
      setLoading(true);
      const res = await getTopSites(filters.limit || 10);

      // Transform API response for chart
      const chartData = (res.data.sites || []).map((s) => ({
        name: s.domain,
        value: s.visits,
      }));

      setSites(chartData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load sites");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading sites...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <PieChartCard
      title="Sites Visits Distribution"
      data={sites}
      colors={["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#F472B6"]}
    />
  );
}
