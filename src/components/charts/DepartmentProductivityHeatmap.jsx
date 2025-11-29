import { useState, useMemo } from "react";

export default function DepartmentProductivityHeatmap({ data = [] }) {
  const [tooltip, setTooltip] = useState(null);

  const departments = useMemo(
    () => data.map((d) => d.department),
    [data]
  );

  const metrics = ["productive", "neutral", "unproductive", "total_events"];

  const matrix = useMemo(() => {
    const m = {};
    data.forEach((d) => {
      m[`${d.department}-productive`] = d.productive_events;
      m[`${d.department}-neutral`] = d.neutral_events;
      m[`${d.department}-unproductive`] = d.unproductive_events;
      m[`${d.department}-total_events`] = d.total_events;
    });
    return m;
  }, [data]);

  const maxValue = Math.max(
    1,
    ...data.flatMap((d) => [
      d.productive_events,
      d.neutral_events,
      d.unproductive_events,
      d.total_events,
    ])
  );

  const getColor = (value) => {
    if (!value) return "rgb(12, 35, 64)";

    const t = value / maxValue;

    const start = [12, 35, 64];
    const end = [255, 214, 102];

    const r = Math.round(start[0] + (end[0] - start[0]) * t);
    const g = Math.round(start[1] + (end[1] - start[1]) * t);
    const b = Math.round(start[2] + (end[2] - start[2]) * t);

    return `rgb(${r}, ${g}, ${b})`;
  };

  if (!data.length) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-gray-500 text-center">
        No department productivity data
      </div>
    );
  }

  return (
    <div className="relative bg-white p-6 rounded-xl shadow border border-gray-200 w-full">

      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Department Productivity Heatmap
      </h2>

      {/* ✅ FULL WIDTH – EXPANDING GRID */}
      <div className="overflow-auto w-full">
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: `120px repeat(${metrics.length}, 1fr)`,
            gridAutoRows: "48px",
            width: "100%",
          }}
        >
          {/* ✅ TOP HEADER */}
          <div />
          {metrics.map((m) => (
            <div
              key={m}
              className="text-xs font-semibold text-gray-600 flex items-center justify-center capitalize"
            >
              {m}
            </div>
          ))}

          {/* ✅ BODY */}
          {departments.map((dept) => (
            <HeatmapRow
              key={dept}
              dept={dept}
              metrics={metrics}
              matrix={matrix}
              getColor={getColor}
              setTooltip={setTooltip}
            />
          ))}
        </div>
      </div>

      {/* ✅ TOOLTIP */}
      {tooltip && (
        <div
          className="fixed bg-black text-white text-xs px-3 py-2 rounded shadow-lg pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            zIndex: 9999,
          }}
        >
          <div className="font-semibold capitalize">{tooltip.metric}</div>
          <div className="text-gray-300">{tooltip.dept}</div>
          <div className="text-yellow-300">{tooltip.value} events</div>
        </div>
      )}

      {/* ✅ LEGEND */}
      <div className="mt-4 flex items-center gap-3 text-xs text-gray-600">
        <span>Low</span>
        <div className="flex h-3 w-44 rounded overflow-hidden">
          <div className="flex-1 bg-[#10315a]" />
          <div className="flex-1 bg-[#2A476F]" />
          <div className="flex-1 bg-[#6B7C8F]" />
          <div className="flex-1 bg-[#FFD666]" />
        </div>
        <span>High</span>   
      </div>
    </div>
  );
}

/* ✅ ROW COMPONENT */
function HeatmapRow({ dept, metrics, matrix, getColor, setTooltip }) {
  return (
    <>
      {/* ✅ LEFT LABEL COLUMN (SMALL) */}
      <div className="text-xs font-semibold text-gray-700 flex items-center px-2 border-r">
        {dept}
      </div>

      {metrics.map((metric) => {
        const value = matrix[`${dept}-${metric}`] || 0;

        return (
          <div
            key={metric}
            className="flex items-center justify-center text-[12px] font-semibold text-white cursor-pointer"
            style={{ backgroundColor: getColor(value) }}
            onMouseEnter={(e) =>
              setTooltip({
                x: e.clientX + 10,
                y: e.clientY - 10,
                dept,
                metric,
                value,
              })
            }
            onMouseLeave={() => setTooltip(null)}
          >
            {value}
          </div>
        );
      })}
    </>
  );
}

