import { useState } from "react";
import { toast } from "react-hot-toast";

import ReportFilters from "../components/reports/ReportFilters";
import { exportCSV } from "../api/reportsApi";

export default function Reports() {
  const [loading, setLoading] = useState(false);

  const handleExport = async (filters) => {
    try {
      setLoading(true);

      const res = await exportCSV(filters);

      if (!res.data) {
        toast.error("No data received");
        return;
      }

      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      const fileName = `${filters.report}_${Date.now()}.csv`;
      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("CSV downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Export failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Reports</h1>

      <ReportFilters onApply={handleExport} />

      <div>
        <button
          disabled={loading}
          onClick={() =>
            toast(
              "Choose your filters then click Export",
              { icon: "ℹ️" }
            )
          }
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Exporting..." : "Export CSV"}
        </button>
      </div>
    </div>
  );
}
