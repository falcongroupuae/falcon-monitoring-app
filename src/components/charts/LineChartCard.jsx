import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatDuration } from "../../utils/formatDuration";

export function LineChartCard({ title, data, dataKeys }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-5 transition-colors">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-4">
        {title}
      </h2>

      <div className="w-full h-96">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
            />

            <XAxis
              stroke="#9CA3AF"
              dataKey={dataKeys.xAxis}
              tickFormatter={(value) => {
                const date = new Date(value);
                if (!isNaN(date)) {
                  return date.toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                  });
                }
                return value;
              }}
            />

            <YAxis
              stroke="#9CA3AF"
              tickFormatter={(value) => formatDuration(value)}
            />

            <Tooltip
              formatter={(value, key) => [formatDuration(value), key]}
              labelFormatter={(value) => {
                const date = new Date(value);
                if (!isNaN(date)) {
                  return date.toLocaleDateString([], {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });
                }
                return value;
              }}
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#ffffff",
              }}
            />

            <Legend />

            {dataKeys.lines.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                strokeWidth={2}
                stroke={["#3B82F6", "#10B981", "#F59E0B"][index % 3]}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
