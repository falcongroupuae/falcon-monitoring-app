export default function ProductivityProgressBar({ data }) {
  if (!data) return null;

  const total = data.productive + data.unproductive + data.neutral || 1;

  const pct = {
    productive: (data.productive / total) * 100,
    unproductive: (data.unproductive / total) * 100,
    // neutral: (data.neutral / total) * 100,
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center justify-center">
      <div className="w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-start">
          Productivity Progress
        </h2>
      </div>
      <div className="h-full w-full flex items-center justify-center">
        {/* Progress Bar Container */}
        <div className="w-full max-w-md h-6 bg-gray-200 rounded-full overflow-hidden flex">
          {/* Productive */}
          <div
            className="h-full bg-green-500"
            style={{ width: `${pct.productive}%` }}
          ></div>

          {/* Unproductive */}
          <div
            className="h-full bg-red-500"
            style={{ width: `${pct.unproductive}%` }}
          ></div>

          {/* Neutral */}
          {/* <div
            className="h-full bg-gray-400"
            style={{ width: `${pct.neutral}%` }}
          ></div> */}
        </div>
      </div>

      <div className="w-full">
        {/* Labels */}
        <div className="flex gap-6 mt-4 text-sm text-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            Productive {pct.productive.toFixed(1)}%
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            Unproductive {pct.unproductive.toFixed(1)}%
          </div>

          {/* <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-400"></span>
            Neutral {pct.neutral.toFixed(1)}%
          </div> */}
        </div>
      </div>
    </div>
  );
}
