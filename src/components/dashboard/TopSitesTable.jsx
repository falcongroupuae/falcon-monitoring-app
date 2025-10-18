import { useEffect, useState } from "react";
import { getTopSites } from "../../api/dashboardApi";
import AGTable from "../tables/AGTable";

export default function TopSitesTable({ filters }) {
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
      const mappedData = (res.data.sites || []).map((site) => ({
        domain: site.domain,
        visits: site.visits,
        total_time_spent: site.total_time_spent ?? "N/A",
      }));
      setSites(mappedData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load top sites");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading top sites...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return <AGTable title="Top Sites" columns={["domain", "visits", "total_time_spent"]} data={sites} />;
}
