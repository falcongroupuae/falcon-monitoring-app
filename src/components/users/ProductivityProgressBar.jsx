export default function ProductivityProgressBar({ score }) {
  // ✅ Prevent crash on undefined
  if (score === null || score === undefined) return null;

  // ✅ Clamp value between 0 and 100
  const safeScore = Math.max(0, Math.min(100, Number(score)));

  // ✅ Dynamic color by performance (optional but useful)
  const barColor =
    safeScore >= 80
      ? "bg-green-500"
      : safeScore >= 50
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center justify-center">
      <div className="w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-start">
          Productivity Score
        </h2>
      </div>
      <div className="h-full w-full flex items-center justify-center">

      <div className="w-full max-w-md h-6 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-500`}
          style={{ width: `${safeScore}%` }}
        />
      </div>
      </div>

      {/* ✅ Label */}
            <div className="w-full flex items-center justify-start">

      <div className="mt-4 text-sm flex items-start gap-2">
        <span className={`w-3 h-3 rounded-full ${barColor}`}></span>
        Productivity Score: <b>{safeScore.toFixed(1)}%</b>
      </div>
      </div>
    </div>
  );
}
