import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getUserOverview } from "../api/usersApi";
import { formatDuration } from "../utils/formatDuration";
import { getUserProductivity } from "../api/usersApi";

import DonutChart from "../components/charts/DonutChart";
import { PieChartCard } from "../components/charts/PieChartCard";
import { BarChartCard } from "../components/charts/BarChartCard";
import { LineChartCard } from "../components/charts/LineChartCard";
import ProductivityProgressBar from "../components/users/ProductivityProgressBar";

import ModernAGTable from "../components/tables/AGTable";
import { StackedBarChartCard } from "../components/charts/StackedBarChartCard";

export default function UserDetail() {
  const { agent_code } = useParams();

  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productivity, setProductivity] = useState(null);
  const [loadingProd, setLoadingProd] = useState(true);

  useEffect(() => {
    loadUser();
    loadProductivity();
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

  const loadProductivity = async () => {
    try {
      setLoadingProd(true);
      const res = await getUserProductivity(agent_code);
      setProductivity(res.data);
    } catch (err) {
      console.error("Productivity error:", err);
    } finally {
      setLoadingProd(false);
    }
  };

  if (loading) return <div className="p-6 text-gray-500">Loading…</div>;

  if (error || !overview)
    return <div className="p-6 text-red-500">Failed to load user details.</div>;

  const k = overview.kpis;

  const donutData = productivity
    ? [
        {
          label: "Productive",
          value: productivity.productive_seconds,
          color: "#10B981",
        },
        {
          label: "Unproductive",
          value: productivity.unproductive_seconds,
          color: "#EF4444",
        },
        {
          label: "Neutral",
          value: productivity.neutral_seconds || 1,
          color: "#9CA3AF",
        },
      ]
    : [];

  const progressData = productivity
    ? {
        productive: productivity.productive_seconds,
        unproductive: productivity.unproductive_seconds,
        neutral: productivity.neutral_seconds,
      }
    : null;

  const productivityPieData = [
    { name: "Active", value: k.total_active_seconds, color: "#10B981" },
    { name: "Idle", value: k.total_idle_seconds, color: "#EF4444" },
  ];

  const topAppsBarData = overview.top_apps.map((a) => ({
    name: a.name,
    count: a.count,
  }));

  const topSitesBarData = overview.top_sites.map((s) => ({
    name: s.name,
    count: s.count,
  }));

  const topAppsPieData = overview.top_apps.map((a) => ({
    name: a.name,
    value: a.count,
  }));

  const topSitesPieData = overview.top_sites.map((s) => ({
    name: s.name,
    value: s.count,
  }));

  const dailyLineData = overview.daily_activity.map((d) => ({
    day: d.day,
    active: d.active_seconds,
    idle: d.idle_seconds,
  }));

  return (
    <div className="p-6 space-y-10">
      {/* TITLE */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{overview.name}</h1>
        <p className="text-gray-600">
          {overview.agent_id} — {overview.department}
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <KPI title="Total Events" value={k.total_events} />
        <KPI
          title="Active Time"
          value={formatDuration(k.total_active_seconds)}
        />
        <KPI title="Idle Time" value={formatDuration(k.total_idle_seconds)} />
        <KPI title="Productivity Ratio" value={`${k.productivity_ratio}%`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductivityProgressBar data={progressData} />
        <DonutChart title="Productivity Breakdown" data={donutData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartCard title="Top Applications" data={topAppsPieData} />
        <BarChartCard
          title="Most Used Applications"
          data={topAppsBarData}
          dataKeys={{
            xAxis: "name",
            bars: ["count"],
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartCard title="Top Sites" data={topSitesPieData} />
        <BarChartCard
          title="Most Visited Sites"
          data={topSitesBarData}
          dataKeys={{
            xAxis: "name",
            bars: ["count"],
          }}
        />
      </div>

      <div className="grid grid-cols-1  lg:grid-cols-2 gap-6">
        <LineChartCard
          title="Daily Activity Trend"
          data={dailyLineData}
          dataKeys={{
            xAxis: "day",
            lines: ["active", "idle"],
          }}
        />
        <StackedBarChartCard title="Daily Activity Stacked Bar" data={dailyLineData} />

      </div>

      <ModernAGTable
        title="Top Applications"
        columns={["name", "count"]}
        data={overview.top_apps}
      />

      <ModernAGTable
        title="Top Sites"
        columns={["name", "count"]}
        data={overview.top_sites}
      />

      <ModernAGTable
        title="Daily Activity"
        columns={["day", "events", "active_seconds", "idle_seconds"]}
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
