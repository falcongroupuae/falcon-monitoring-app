import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FaExpand, FaTimes } from "react-icons/fa";
import { useState } from "react";

export function PieChartCard({
  title,
  data = [],
  colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderLabel = ({ percent }) => `${(percent * 100).toFixed(0)}%`;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-sm">
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-gray-600">{value} visits</p>
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return <div className="text-gray-500">No data available</div>;
  }

  return (
    <>
      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={() => setIsExpanded(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            title="Expand chart"
          >
            <FaExpand className="text-gray-500 hover:text-blue-600 transition-colors" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <FaTimes className="text-gray-500 hover:text-red-600 transition-colors text-lg" />
              </button>
            </div>
            <div className="p-8 flex-1">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
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
