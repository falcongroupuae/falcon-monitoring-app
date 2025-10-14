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
    <div className="bg-white shadow-lg rounded-2xl p-5">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>
      <div className="w-full h-96">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              stroke="#000000"
              dataKey={dataKeys.xAxis}
              tickFormatter={(value) => {
                // Format to readable date (e.g. "Oct 9" or "2025-10-09")
                const date = new Date(value);
                if (!isNaN(date)) {
                  return date.toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                  });
                }
                return value; // fallback in case value is already a string
              }}
            />
            <YAxis stroke="#000000" />
            <Tooltip
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
