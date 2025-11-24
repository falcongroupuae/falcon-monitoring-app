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

      const limit = filters?.limit || 10;

      const res = await getTopSites(limit);

      if (!Array.isArray(res.data)) {
        throw new Error("Invalid API response");
      }

      // Map API format → table format
      const mappedData = res.data.map((item) => ({
        domain: item.name || "Unknown",
        visits: item.count ?? 0,
      }));

      setSites(mappedData);
    } catch (err) {
      console.error(err);
      setHasError(true);
      toast.error("Failed to load top sites");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Helper UI Values ----------
  const LoadingRow = [
    {
      domain: <FaSpinner className="animate-spin text-gray-500" />,
      visits: "...",
    },
  ];

  const ErrorRow = [
    {
      domain: <FaExclamationTriangle className="text-red-500" />,
      visits: "Error",
    },
  ];

  const finalData = loading ? LoadingRow : hasError ? ErrorRow : sites;

  return (
    <AGTable
      title="Top Sites"
      columns={["domain", "visits"]}
      data={finalData}
    />
  );
}
