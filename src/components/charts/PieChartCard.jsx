import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  FaExpand,
  FaTimes,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useState } from "react";

export function PieChartCard({
  title,
  data = [],
  loading = false,
  error = false,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Dynamic colors
  const colors = generateColors(data.length);

  // 📌 Loading State (INSIDE card)
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border p-6 h-full flex items-center justify-center">
        <FaSpinner className="animate-spin text-gray-500 text-2xl" />
      </div>
    );
  }

  // 📌 Error State (INSIDE card)
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg border p-6 h-full flex items-center justify-center text-red-500 gap-2">
        <FaExclamationTriangle className="text-xl" />
        <span>Error loading site data</span>
      </div>
    );
  }

  // 📌 No data state
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border p-6 h-full flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  // ----- Normal Chart -----
  const labelRenderer = ({ percent }) =>
    percent < 0.03 ? "" : `${(percent * 100).toFixed(0)}%`;

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    const { name, value } = payload[0].payload;

    return (
      <div className="bg-white border rounded-lg px-3 py-2 shadow text-sm">
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-gray-600">{value} visits</p>
      </div>
    );
  };

  return (
    <>
      {/* CARD */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

          <button
            onClick={() => setIsExpanded(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaExpand className="text-gray-500 hover:text-blue-600" />
          </button>
        </div>

        {/* PIE CHART (Dashboard) */}
        <div className="flex-1 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={labelRenderer}
                outerRadius={150}
                dataKey="value"
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color || colors[i]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* EXPANDED MODAL */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-xl font-semibold">{title}</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 hover:bg-gray-200 rounded-lg"
              >
                <FaTimes className="text-gray-500 hover:text-red-600 text-lg" />
              </button>
            </div>

            <div className="p-8 flex-1">
              <ResponsiveContainer width="100%" height={500}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={220}
                    dataKey="value"
                    label={labelRenderer}
                    labelLine={false}
                  >
                    {data.map((entry, i) => (
                     <Cell key={i} fill={entry.color || colors[i]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- dynamic color generator -------- */
function generateColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.round((360 / count) * i);
    colors.push(`hsl(${hue}, 70%, 55%)`);
  }
  return colors;
}
