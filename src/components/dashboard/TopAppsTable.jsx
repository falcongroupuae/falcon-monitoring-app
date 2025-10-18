import { useEffect, useState } from "react";
import { getTopApps } from "../../api/dashboardApi";
import AGTable from "../tables/AGTable";

export default function TopAppsTable({ filters }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApps();
  }, [filters]);

  const fetchApps = async () => {
    try {
      setLoading(true);
      const res = await getTopApps(filters.limit || 10);
      const mappedData = (res.data.apps || []).map((app) => ({
        application: app.application,
        uses: app.uses,
        total_time_spent: app.total_time_spent ?? "N/A",
      }));
      setApps(mappedData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load top apps");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading top apps...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return <AGTable title="Top Apps" columns={["application", "uses", "total_time_spent"]} data={apps} />;
}
