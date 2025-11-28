import { useState } from "react";

export default function AppsHeatmap({ data = [] }) {
  const [tooltip, setTooltip] = useState(null);

  if (!data.length) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-gray-500 text-center">
        No heatmap data available
      </div>
    );
  }

  const apps = [...new Set(data.map((d) => d.item))];
  const departments = [...new Set(data.map((d) => d.department))];

  const matrix = {};
  data.forEach((d) => {
    matrix[`${d.item}-${d.department}`] = d.count;
  });

  const maxValue = Math.max(...data.map((d) => d.count));

  const getColor = (value) => {
    if (!value) return "rgb(240, 253, 244)"; // #F0FDF4 lightest green

    const intensity = value / maxValue;

    const start = [240, 253, 244];
    const end = [22, 163, 74];

    const r = start[0] + (end[0] - start[0]) * intensity;
    const g = start[1] + (end[1] - start[1]) * intensity;
    const b = start[2] + (end[2] - start[2]) * intensity;

    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-200">

      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Application Usage Heatmap
      </h2>

      {/* Heatmap container */}
      <div className="overflow-auto max-h-[600px] rounded-lg border border-gray-200 relative">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr>
              {/* Hidden header for alignment */}
              {/* <th className="p-2 text-transparent">App</th> */}
              {/* {departments.map((dept) => (
                <th key={dept} className="p-2 text-gray-600 font-medium text-xs text-center">
                  {dept}
                </th>
              ))} */}
            </tr>
          </thead>

          <tbody>
            {apps.map((app) => (
              <tr key={app}>
                {/* <td className="p-2 text-transparent">{app}</td> */}

                {departments.map((dept) => {
                  const value = matrix[`${app}-${dept}`] || 0;

                  return (
                    <td
                      key={dept}
                      className="relative cursor-pointer hover:scale-[1] transition-transform"
                      style={{
                        backgroundColor: getColor(value),
                        padding: "15px",
                        borderRadius: "0px",
                      }}
                      onMouseEnter={(e) => {
                        const rect = e.target.getBoundingClientRect();
                        setTooltip({
                          x: rect.right + 10,
                          y: rect.top,
                          app,
                          dept,
                          value,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      {value > 0 ? (
                        <span className="text-[10px] font-bold text-gray-700">
                          {/* {value} */}
                        </span>
                      ) : (
                        ""
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Tooltip */}
      {tooltip && (
        <div
          className="absolute bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            zIndex: 9999,
          }}
        >
          <div className="font-semibold capitalize">{tooltip.app}</div>
          <div className="text-gray-300">{tooltip.dept}</div>
          <div className="text-green-300">{tooltip.value} events</div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center gap-3 text-xs text-gray-600">
        <span>Low</span>
        <div className="flex h-3 w-44 rounded overflow-hidden">
          <div className="flex-1 bg-green-50" />
          <div className="flex-1 bg-green-200" />
          <div className="flex-1 bg-green-400" />
          <div className="flex-1 bg-green-600" />
        </div>
        <span>High</span>
      </div>
    </div>
  );
}
