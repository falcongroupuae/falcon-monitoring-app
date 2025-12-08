import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaExpand, FaTimes } from "react-icons/fa";
import { useState } from "react";

/* ✅ CUSTOM TOOLTIP — REQUIRED FOR DARK MODE */
function CustomTooltip({ active, payload, label, dark }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      className={`
        px-3 py-2 rounded-lg text-sm shadow-lg border
        ${dark
          ? "bg-gray-900 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-800"
        }
      `}
    >
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.fill }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

export function BarChartCard({ title, data, dataKeys, barColors }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const COLORS = ["#1E3A8A", "#065F46", "#92400E", "#7F1D1D"];

  const renderBars = () =>
    dataKeys.bars.map((key, index) => (
      <Bar
        key={key}
        dataKey={key}
        fill={barColors?.[key] || COLORS[index % COLORS.length]}
        radius={[8, 8, 0, 0]}
      />
    ));

  return (
    <>
      {/* ✅ CARD */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-auto flex flex-col transition-colors">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h3>
          <button
            onClick={() => setIsExpanded(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Expand chart"
          >
            <FaExpand className="text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors" />
          </button>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={dataKeys.xAxis} stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip dark={false} />} />
            <Legend />
            {renderBars()}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ EXPANDED MODAL */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {title}
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaTimes className="text-gray-500 dark:text-gray-400 hover:text-red-600 transition-colors text-lg" />
              </button>
            </div>

            <div className="p-8 flex-1">
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey={dataKeys.xAxis} stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip content={<CustomTooltip dark />} />
                  <Legend />
                  {renderBars()}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
