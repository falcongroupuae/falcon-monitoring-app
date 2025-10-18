export function StatsCard({ title, value, change, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        {change && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              change.startsWith("+")
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {change}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        {icon && <div className="text-3xl text-gray-300">{icon}</div>}
      </div>
    </div>
  );
}