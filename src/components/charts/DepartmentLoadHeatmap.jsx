export default function DepartmentLoadHeatmap({ data = [] }) {
  if (!data.length) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-gray-500 text-center">
        No department load data available
      </div>
    );
  }

  // ✅ Aggregate total usage per department
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

  // ✅ Color scale
  const getColor = (value) => {
    const intensity = value / maxValue;
    return `rgba(59, 130, 246, ${intensity})`; // blue heat
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Department Application Load Heatmap
      </h2>

      <div className="grid grid-cols-1 gap-3">
        {departments.map((dept) => {
          const value = departmentTotals[dept];

          return (
            <div key={dept} className="flex items-center gap-3">
              {/* Department Name */}
              <div className="w-48 text-sm font-medium text-gray-700">
                {dept}
              </div>

              {/* Heat Bar */}
              <div className="flex-1 h-6 bg-gray-200 rounded overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${(value / maxValue) * 100}%`,
                    backgroundColor: getColor(value),
                  }}
                />
              </div>

              {/* Value */}
              <div className="w-24 text-right font-semibold text-gray-700 text-sm">
                {value}
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ Legend */}
      <div className="mt-4 flex items-center gap-3 text-xs text-gray-600">
        <span>Low</span>
        <div className="flex h-3 w-32 rounded overflow-hidden">
          <div className="flex-1 bg-blue-200" />
          <div className="flex-1 bg-blue-400" />
          <div className="flex-1 bg-blue-600" />
        </div>
        <span>High</span>
      </div>
    </div>
  );
}
