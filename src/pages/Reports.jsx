import { useState } from "react";
import { toast } from "react-hot-toast";

import ReportFilters from "../components/reports/ReportFilters";
import { exportCSV } from "../api/reportsApi";

export default function Reports() {
  const [loading, setLoading] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [exportHistory, setExportHistory] = useState([]);

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    setPreviewData(null);
    toast.success("Filters applied. Ready to preview or export.");
  };

  const handlePreview = async () => {
    if (!appliedFilters) {
      toast.error("Apply filters first");
      return;
    }

    try {
      setLoading(true);
      const res = await exportCSV(appliedFilters);
      const text = await res.data.text();
      const rows = text
        .split("\n")
        .slice(0, 6)
        .map((r) => r.split(","));

      setPreviewData(rows);
      toast.success("Preview loaded");
    } catch {
      toast.error("Preview failed");
    } finally {
      setLoading(false);
    }
  };

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
    } catch {
      toast.error("Export failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAppliedFilters(null);
    setPreviewData(null);
    toast("Report reset", { icon: "🗑️" });
  };

  return (
    <div className="p-6 space-y-10 bg-gray-50 dark:bg-gray-900 h-screen transition-colors">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Reports
      </h1>

      {/* ✅ FILTER BUILDER */}
      <ReportFilters onApply={handleApplyFilters} />

      {/* ✅ REPORT SUMMARY */}
      {appliedFilters && (
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
            Report Summary
          </h3>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
            <p><b>Report:</b> {appliedFilters.report}</p>
            <p><b>User:</b> {appliedFilters.agent_code || "All"}</p>
            <p><b>Department:</b> {appliedFilters.department || "All"}</p>
            <p>
              <b>Date:</b>{" "}
              {appliedFilters.start_date || "Any"} →{" "}
              {appliedFilters.end_date || "Any"}
            </p>
          </div>

          <div className="mt-3 font-semibold text-green-700 dark:text-green-400">
            ✅ Ready for Preview or Export
          </div>
        </div>
      )}

      {/* ✅ ACTION BAR */}
      <div className="flex flex-wrap gap-4">

        {/* Preview — secondary */}
        <button
          onClick={handlePreview}
          disabled={!appliedFilters || loading}
          className="
            px-6 py-3 rounded-xl font-semibold text-sm
            bg-white dark:bg-transparent
            border border-gray-300 dark:border-gray-600
            text-gray-800 dark:text-gray-200
            hover:bg-gray-100 dark:hover:bg-gray-800
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all
          "
        >
          Preview
        </button>

        {/* Export — primary */}
        <button
          onClick={handleExport}
          disabled={!appliedFilters || loading}
          className="
            px-6 py-3 rounded-xl font-semibold text-sm
            bg-green-600 hover:bg-green-700
            text-white
            disabled:opacity-60 disabled:cursor-not-allowed
            transition-all
          "
        >
          {loading ? "Exporting..." : "Export CSV"}
        </button>

        {/* Reset — destructive */}
        <button
          onClick={handleReset}
          className="
            px-6 py-3 rounded-xl font-semibold text-sm
            border border-red-300 dark:border-red-800
            text-red-600 dark:text-red-400
            bg-red-50 dark:bg-transparent
            hover:bg-red-100 dark:hover:bg-red-900/30
            transition-all
          "
        >
          Reset
        </button>
      </div>

      {/* ✅ PREVIEW TABLE */}
      {previewData && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 overflow-x-auto transition-colors">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
            Preview (First 5 Rows)
          </h3>

          <table className="min-w-full text-sm">
            <tbody>
              {previewData.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="px-3 py-2 border-r border-gray-200 dark:border-gray-700"
                    >
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
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 transition-colors">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
            Export History
          </h3>

          <div className="space-y-2 text-sm">
            {exportHistory.map((h, i) => (
              <div
                key={i}
                className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-700 dark:text-gray-300"
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
