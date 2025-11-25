import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getUserOverview } from "../api/usersApi";
import { formatDuration } from "../utils/formatDuration";

import MiniPieChart from "../components/charts/MiniPieChart";
import ModernAGTable from "../components/tables/AGTable";

export default function UserDetail() {
  const { agent_code } = useParams();

  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadUser();
  }, [agent_code]);

  const loadUser = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await getUserOverview(agent_code);
      setOverview(res.data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className="p-6 text-gray-500">Loading user overview…</div>;

  if (error || !overview)
    return (
      <div className="p-6 text-red-500">
        Failed to load user details. Please try again.
      </div>
    );

  const k = overview.kpis;

  return (
    <div className="p-6 space-y-10">
      {/* TITLE */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{overview.name}</h1>
        <p className="text-gray-600">
          {overview.agent_id} — {overview.department}
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <KPI title="Total Events" value={k.total_events} />
        <KPI title="Active Time" value={formatDuration(k.total_active_seconds)} />
        <KPI title="Idle Time" value={formatDuration(k.total_idle_seconds)} />
        <KPI title="Productivity Ratio" value={`${k.productivity_ratio}%`} />
      </div>

      {/* Productivity Pie */}
      <div className="bg-white shadow rounded-xl p-6 w-[320px]">
        <h2 className="text-xl font-semibold mb-4">Productivity Breakdown</h2>

        <MiniPieChart
          data={[
            { label: "Productive", value: k.total_active_seconds },
            { label: "Idle", value: k.total_idle_seconds },
            { label: "Neutral", value: 1 }, // fallback to avoid all-zero pie
          ]}
        />
      </div>

      {/* Top Apps */}
      <ModernAGTable
        title="Top Applications"
        columns={["name", "count"]}
        data={overview.top_apps}
      />

      {/* Top Sites */}
      <ModernAGTable
        title="Top Sites"
        columns={["name", "count"]}
        data={overview.top_sites}
      />

      {/* Daily Activity */}
      <ModernAGTable
        title="Daily Activity"
        columns={[
          "day",
          "events",
          "active_seconds",
          "idle_seconds",
        ]}
        data={overview.daily_activity.map((d) => ({
          ...d,
          active_seconds: formatDuration(d.active_seconds),
          idle_seconds: formatDuration(d.idle_seconds),
        }))}
      />
    </div>
  );
}

function KPI({ title, value }) {
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
    </div>
  );
}
