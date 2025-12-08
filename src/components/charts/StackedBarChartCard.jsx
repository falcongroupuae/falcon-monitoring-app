import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { formatDuration } from "../../utils/formatDuration";

export function StackedBarChartCard({ title, data }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-5 transition-colors">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-4">
        {title}
      </h2>

      <div className="w-full h-96">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
            />

            <XAxis
              dataKey="day"
              stroke="#9CA3AF"
              tickFormatter={(v) =>
                new Date(v).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <YAxis
              stroke="#9CA3AF"
              tickFormatter={(v) => formatDuration(v)}
            />

            <Tooltip
              formatter={(v) => formatDuration(v)}
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#ffffff",
              }}
            />

            <Legend />

            <Bar dataKey="active" stackId="1" fill="#10B981" />
            <Bar dataKey="idle" stackId="1" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
