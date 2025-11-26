import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { formatDuration } from "../../utils/formatDuration";

export function CombinedChartCard({ title, data }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="w-full h-96">
        <ResponsiveContainer>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="day"
              tickFormatter={(v) =>
                new Date(v).toLocaleDateString([], { month: "short", day: "numeric" })
              }
            />

            <YAxis tickFormatter={formatDuration} />

            <Tooltip formatter={(v) => formatDuration(v)} />
            <Legend />

            <Bar dataKey="active" fill="#3B82F6" />

            <Line dataKey="idle" stroke="#F59E0B" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
