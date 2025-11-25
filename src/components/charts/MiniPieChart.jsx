import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function MiniPieChart({ data }) {
  const COLORS = ["#10B981", "#EF4444", "#F59E0B"];

  return (
    <div className="w-16 h-16">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={12}
            outerRadius={20}
            paddingAngle={1}
          >
            {data.map((entry, idx) => (
              <Cell key={idx} fill={COLORS[idx]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
