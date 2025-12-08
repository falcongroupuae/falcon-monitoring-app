import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function DonutChart({ title, data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow flex items-center justify-center h-64 text-gray-500 dark:text-gray-400 transition-colors">
        No data available
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-6 rounded-xl shadow transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        {title}
      </h2>

      <div className="w-full h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
              label={({ percent }) =>
                percent > 0 ? `${(percent * 100).toFixed(0)}%` : ""
              }
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, label) => [`${value} sec`, label]}
              contentStyle={{
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: "6px",
                color: "#ffffff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex gap-4 flex-wrap">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-700 dark:text-gray-300">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
