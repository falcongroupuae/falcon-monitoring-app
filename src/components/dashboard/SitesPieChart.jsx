import { useEffect, useState } from "react";
import { PieChartCard } from "../charts/PieChartCard";
import { getTopSites } from "../../api/dashboardApi";
import { toast } from "react-hot-toast";

export default function SitesPieChart({ filters }) {
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

      const res = await getTopSites(filters.limit || 10);

      if (!Array.isArray(res.data)) throw new Error("Invalid API response");

      const chartData = res.data.map((item) => ({
        name: item.name || "Unknown",
        value: item.count ?? 0,
      }));

      setSites(chartData);
    } catch (err) {
      console.error(err);
      setHasError(true);
      toast.error("Failed to load site chart");
      setSites([]); // important: empty data → PieCard will show error view
    } finally {
      setLoading(false);
    }
  };

  return (
    <PieChartCard
      title="Sites Visits Distribution"
      data={sites}
      loading={loading}
      error={hasError}
    />
  );
}
