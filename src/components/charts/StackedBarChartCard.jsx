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
    <div className="bg-white shadow-lg rounded-2xl p-5">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>

      <div className="w-full h-96">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="day"
              tickFormatter={(v) =>
                new Date(v).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <YAxis tickFormatter={(v) => formatDuration(v)} />

            <Tooltip formatter={(v) => formatDuration(v)} />
            <Legend />

            <Bar dataKey="active" stackId="1" fill="#10B981" />
            <Bar dataKey="idle" stackId="1" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
