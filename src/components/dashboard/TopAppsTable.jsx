import { useEffect, useState } from "react";
import { getTopApps } from "../../api/dashboardApi";
import AGTable from "../tables/AGTable";
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function TopAppsTable({ filters }) {
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

      const limit = filters?.limit || 10;

      const res = await getTopApps(limit);

      if (!Array.isArray(res.data)) {
        throw new Error("Invalid API response");
      }

      const mappedData = res.data.map((item) => ({
        application: item.name || "Unknown",
        uses: item.count ?? 0,
      }));

      setApps(mappedData);
    } catch (err) {
      console.error(err);
      setHasError(true);
      toast.error("Failed to load top apps");
      setApps([]); // required to trigger error row
    } finally {
      setLoading(false);
    }
  };

  // UI rows
  const LoadingRow = [
    {
      application: <FaSpinner className="animate-spin text-gray-500" />,
      uses: "...",
    },
  ];

  const ErrorRow = [
    {
      application: <FaExclamationTriangle className="text-red-500" />,
      uses: "Error",
    },
  ];

  // Final dataset that table will render
  const finalData = loading ? LoadingRow : hasError ? ErrorRow : apps;

  return (
    <AGTable
      title="Top Applications"
      columns={["application", "uses"]}
      data={finalData}
    />
  );
}
