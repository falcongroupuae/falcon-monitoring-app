import { useState } from "react";
import { toast } from "react-hot-toast";

import ReportFilters from "../components/reports/ReportFilters";
import { exportCSV } from "../api/reportsApi";

export default function Reports() {
  const [loading, setLoading] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [exportHistory, setExportHistory] = useState([]);

  /* ============================
     ✅ APPLY FILTERS ONLY
  ============================ */
  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    setPreviewData(null);
    toast.success("Filters applied. Ready to preview or export.");
  };

  /* ============================
     ✅ PREVIEW CSV BEFORE EXPORT
  ============================ */
  const handlePreview = async () => {
    if (!appliedFilters) {
      toast.error("Apply filters first");
      return;
    }

    try {
      setLoading(true);

      const res = await exportCSV(appliedFilters);
      const text = await res.data.text();
      const rows = text.split("\n").slice(0, 6).map((r) => r.split(","));

      setPreviewData(rows);
      toast.success("Preview loaded");
    } catch (err) {
      console.error(err);
      toast.error("Preview failed");
    } finally {
      setLoading(false);
    }
  };

  /* ============================
     ✅ EXPORT CSV
  ============================ */
  const handleExport = async () => {
    if (!appliedFilters) {
      toast.error("Apply filters before exporting");
      return;
    }

    try {
      setLoading(true);

      const res = await exportCSV(appliedFilters);
      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const fileName = `${appliedFilters.report}_${Date.now()}.csv`;

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setExportHistory((prev) => [
        {
          report: appliedFilters.report,
          agent: appliedFilters.agent_code || "All",
          department: appliedFilters.department || "All",
          time: new Date().toLocaleString(),
          file: fileName,
        },
        ...prev,
      ]);

      toast.success("CSV downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Export failed");
    } finally {
      setLoading(false);
    }
  };

  /* ============================
     ✅ RESET EVERYTHING
  ============================ */
  const handleReset = () => {
    setAppliedFilters(null);
    setPreviewData(null);
    toast("Report reset", { icon: "🗑️" });
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Reports</h1>

      {/* ✅ FILTER BUILDER */}
      <ReportFilters onApply={handleApplyFilters} />

      {/* ✅ REPORT SUMMARY CARD */}
      {appliedFilters && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Report Summary
          </h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <p><b>Report:</b> {appliedFilters.report}</p>
            <p><b>User:</b> {appliedFilters.agent_code || "All"}</p>
            <p><b>Department:</b> {appliedFilters.department || "All"}</p>
            <p>
              <b>Date:</b>{" "}
              {appliedFilters.start_date || "Any"} →{" "}
              {appliedFilters.end_date || "Any"}
            </p>
          </div>

          <div className="mt-3 text-green-700 font-semibold">
            ✅ Ready for Preview or Export
          </div>
        </div>
      )}

      {/* ✅ ACTION BAR */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handlePreview}
          disabled={!appliedFilters || loading}
          className="bg-gray-200 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 disabled:opacity-50"
        >
          Preview
        </button>

        <button
          onClick={handleExport}
          disabled={!appliedFilters || loading}
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Exporting..." : "Export CSV"}
        </button>

        <button
          onClick={handleReset}
          className="bg-red-100 text-red-600 px-6 py-3 rounded-xl font-semibold"
        >
          Reset
        </button>
      </div>

      {/* ✅ PREVIEW TABLE */}
      {previewData && (
        <div className="bg-white border rounded-xl p-5 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-3">Preview (First 5 Rows)</h3>
          <table className="min-w-full text-sm border">
            <tbody>
              {previewData.map((row, i) => (
                <tr key={i} className="border-b">
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 border-r">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ EXPORT HISTORY */}
      {exportHistory.length > 0 && (
        <div className="bg-white border rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-3">Export History</h3>

          <div className="space-y-2 text-sm">
            {exportHistory.map((h, i) => (
              <div
                key={i}
                className="flex justify-between border-b pb-2 text-gray-700"
              >
                <span>
                  <b>{h.report}</b> | {h.agent} | {h.department}
                </span>
                <span>{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
