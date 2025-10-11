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

export function LineChartCard({ title, data, dataKeys }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={dataKeys.xAxis}
              tickFormatter={(value) => {
                // Only show time part (HH:mm)
                const date = new Date(value);
                return date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
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
