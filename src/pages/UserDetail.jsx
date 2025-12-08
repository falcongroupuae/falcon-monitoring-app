import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { getUserOverview } from "../api/usersApi";
import { getSummary } from "../api/dashboardApi";
import { formatDuration } from "../utils/formatDuration";

import DonutChart from "../components/charts/DonutChart";
import { PieChartCard } from "../components/charts/PieChartCard";
import { BarChartCard } from "../components/charts/BarChartCard";
import { LineChartCard } from "../components/charts/LineChartCard";
import ProductivityProgressBar from "../components/users/ProductivityProgressBar";
import ModernAGTable from "../components/tables/AGTable";
import { StackedBarChartCard } from "../components/charts/StackedBarChartCard";

export default function UserDetail() {
  const { agent_code } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(location.search);

  const initialFilters =
    location.state?.filters || {
      startDate: urlParams.get("startDate") || "",
      endDate: urlParams.get("endDate") || "",
      startTime: urlParams.get("startTime") || "",
      endTime: urlParams.get("endTime") || "",
      department: urlParams.get("department") || "",
    };

  const [filters, setFilters] = useState(initialFilters);
  const [overview, setOverview] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.startDate) params.set("startDate", filters.startDate);
    if (filters.endDate) params.set("endDate", filters.endDate);
    if (filters.startTime) params.set("startTime", filters.startTime);
    if (filters.endTime) params.set("endTime", filters.endTime);
    if (filters.department) params.set("department", filters.department);

    navigate({ search: params.toString() }, { replace: true });
  }, [filters, navigate]);

  useEffect(() => {
    loadUser();
  }, [agent_code, filters]);

  const buildDateTime = (date, time, fallbackTime) => {
    if (!date) return null;
    const finalTime = time ? `${time}:00` : fallbackTime;
    return `${date}T${finalTime}`;
  };

  const loadUser = async () => {
    try {
      setLoading(true);
      setError(false);

      const queryParams = {
        start_date: buildDateTime(filters.startDate, filters.startTime, "00:00:00"),
        end_date: buildDateTime(filters.endDate, filters.endTime, "23:59:59"),
        department: filters.department || null,
        agent_code,
      };

      const [overviewRes, summaryRes] = await Promise.all([
        getUserOverview(queryParams),
        getSummary(queryParams),
      ]);

      setOverview(overviewRes.data);
      setSummary(summaryRes.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      department: "",
    });
    navigate(`/users/${agent_code}`, { replace: true });
  };

  const goBack = () => navigate(-1);

  if (loading)
    return <div className="p-6 text-gray-500 dark:text-gray-400">Loading…</div>;

  if (error || !overview || !summary)
    return (
      <div className="p-6 text-red-500">
        Failed to load user details.
      </div>
    );

  const k = overview.kpis;

  const donutData = [
    { label: "Productive Events", value: k.keyword_productive_events, color: "#12a592" },
    { label: "Unproductive Events", value: k.keyword_unproductive_events, color: "#f2560e" },
    { label: "Neutral Events", value: k.keyword_neutral_events, color: "#7b7d7f" },
  ];

  const topAppsBarData = overview.top_apps.map((a) => ({
    name: a.name,
    count: a.count,
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
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={goBack}
            className="mb-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Users
          </button>

          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {overview.name}
          </h1>

          <p className="text-gray-600 dark:text-gray-400">
            {overview.agent_id} — {overview.department}
          </p>
        </div>

        <button
          onClick={clearFilters}
          className="px-4 py-2 text-sm rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100"
        >
          Clear Filters
        </button>
      </div>

      {/* FILTER CHIPS */}
      <div className="flex flex-wrap gap-2">
        {filters.startDate && <Chip label={`Start: ${filters.startDate}`} />}
        {filters.endDate && <Chip label={`End: ${filters.endDate}`} />}
        {filters.startTime && <Chip label={`From: ${filters.startTime}`} />}
        {filters.endTime && <Chip label={`To: ${filters.endTime}`} />}
        {filters.department && <Chip label={`Dept: ${filters.department}`} />}
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <KPI title="Total Events" value={summary.events} />
        <KPI title="Active Time" value={formatDuration(summary.active_seconds)} />
        <KPI title="Idle Time" value={formatDuration(summary.idle_seconds)} />
        <KPI title="Productivity Ratio" value={`${k.productivity_ratio}%`} />
      </div>

      {/* PRODUCTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductivityProgressBar score={k.keyword_productivity_score} />
        <DonutChart title="Event Breakdown" data={donutData} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartCard title="Top Sites" data={topSitesPieData} />
        <BarChartCard
          title="Most Used Applications"
          data={topAppsBarData}
          dataKeys={{ xAxis: "name", bars: ["count"] }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartCard
          title="Daily Activity Trend"
          data={dailyLineData}
          dataKeys={{ xAxis: "day", lines: ["active", "idle"] }}
        />
        <StackedBarChartCard title="Daily Activity Stacked Bar" data={dailyLineData} />
      </div>

      {/* TABLES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ModernAGTable title="Top Applications" columns={["name", "count"]} data={overview.top_apps} />
        <ModernAGTable title="Top Sites" columns={["name", "count"]} data={overview.top_sites} />
      </div>

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

/* CHIP */
function Chip({ label }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
      {label}
    </span>
  );
}

function KPI({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 rounded-xl p-5 transition-colors">
      <div className="text-gray-500 dark:text-gray-400 text-sm">{title}</div>
      <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {value}
      </div>
    </div>
  );
}
