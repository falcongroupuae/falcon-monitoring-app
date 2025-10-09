import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FaExpand, FaTimes } from "react-icons/fa";
import { useState } from "react";


export function BarChartCard({ title, data, dataKeys }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
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
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey={dataKeys.xAxis} stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Legend />
            {dataKeys.bars.map((key, index) => (
              <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} radius={[8, 8, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
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
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey={dataKeys.xAxis} stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  {dataKeys.bars.map((key, index) => (
                    <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} radius={[8, 8, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
