export function StatsCard({ title, value, change, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </h3>

        {change && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              change.startsWith("+")
                ? "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
                : "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
            }`}
          >
            {change}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          {value}
        </p>

        {icon && (
          <div className="text-3xl text-gray-300 dark:text-gray-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
