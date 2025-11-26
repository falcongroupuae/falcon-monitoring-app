import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { formatDuration } from "../../utils/formatDuration";

export function StackedAreaChartCard({ title, data }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-5">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>

      <div className="w-full h-96">
        <ResponsiveContainer>
          <AreaChart data={data}>
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

            <Area
              type="monotone"
              dataKey="active"
              stackId="1"
              stroke="#10B981"
              fill="#10B98155"
            />
            <Area
              type="monotone"
              dataKey="idle"
              stackId="1"
              stroke="#EF4444"
              fill="#EF444455"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
