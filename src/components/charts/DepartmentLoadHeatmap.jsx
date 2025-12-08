export default function DepartmentLoadHeatmap({ data = [] }) {
  if (!data.length) {
    return (
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow text-gray-500 dark:text-gray-400 text-center transition-colors">
        No department load data available
      </div>
    );
  }

  const departmentTotals = {};

  data.forEach((d) => {
    if (!departmentTotals[d.department]) {
      departmentTotals[d.department] = 0;
    }
    departmentTotals[d.department] += d.count;
  });

  const departments = Object.keys(departmentTotals);
  const totals = Object.values(departmentTotals);
  const maxValue = Math.max(...totals);

  const getColor = (value) => {
    const intensity = value / maxValue;
    return `rgba(59, 130, 246, ${intensity})`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow transition-colors">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Department Application Load Heatmap
      </h2>

      <div className="grid grid-cols-1 gap-3">
        {departments.map((dept) => {
          const value = departmentTotals[dept];

          return (
            <div key={dept} className="flex items-center gap-3">
              {/* Department Name */}
              <div className="w-48 text-sm font-medium text-gray-700 dark:text-gray-300">
                {dept}
              </div>

              {/* Heat Bar */}
              <div className="flex-1 h-6 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${(value / maxValue) * 100}%`,
                    backgroundColor: getColor(value),
                  }}
                />
              </div>

              {/* Value */}
              <div className="w-24 text-right font-semibold text-gray-700 dark:text-gray-200 text-sm">
                {value}
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ Legend */}
      <div className="mt-4 flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
        <span>Low</span>
        <div className="flex h-3 w-32 rounded overflow-hidden">
          <div className="flex-1 bg-blue-200 dark:bg-blue-900/40" />
          <div className="flex-1 bg-blue-400 dark:bg-blue-600/60" />
          <div className="flex-1 bg-blue-600 dark:bg-blue-400" />
        </div>
        <span>High</span>
      </div>
    </div>
  );
}
