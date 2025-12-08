import { useEffect, useState } from "react";

import Filter from "../components/common/Filter";
import {
  getAppsHeatmap,
  getTitlesHeatmap,
  getDepartmentProductivity,
} from "../api/statsApi";

import { BarChartCard } from "../components/charts/BarChartCard";
import { PieChartCard } from "../components/charts/PieChartCard";
import AppsHeatmap from "../components/charts/AppsHeatmap";
import DepartmentLoadHeatmap from "../components/charts/DepartmentLoadHeatmap";
import ModernAGTable from "../components/tables/AGTable";
import DepartmentProductivityHeatmap from "../components/charts/DepartmentProductivityHeatmap";

export default function Statistics() {
  const [filters, setFilters] = useState({});

  const [appsData, setAppsData] = useState([]);
  const [titlesData, setTitlesData] = useState([]);
  const [deptProductivity, setDeptProductivity] = useState([]);

  const [loadingApps, setLoadingApps] = useState(true);
  const [loadingTitles, setLoadingTitles] = useState(true);
  const [loadingDept, setLoadingDept] = useState(true);

  useEffect(() => {
    loadAllStats();
  }, [filters]);

  const loadAllStats = async () => {
    try {
      setLoadingApps(true);
      setLoadingTitles(true);
      setLoadingDept(true);

      const [appsRes, titlesRes, deptRes] = await Promise.all([
        getAppsHeatmap(filters),
        getTitlesHeatmap(filters),
        getDepartmentProductivity(filters),
      ]);

      setAppsData(appsRes.data || []);
      setTitlesData(titlesRes.data || []);
      setDeptProductivity(deptRes.data || []);
    } catch (err) {
      setAppsData([]);
      setTitlesData([]);
      setDeptProductivity([]);
    } finally {
      setLoadingApps(false);
      setLoadingTitles(false);
      setLoadingDept(false);
    }
  };

  const handleApplyFilters = (applied) => {
    setFilters(applied);
  };

  const departmentPieData = Object.values(
    appsData.reduce((acc, row) => {
      acc[row.department] = acc[row.department] || {
        name: row.department,
        value: 0,
      };
      acc[row.department].value += row.count;
      return acc;
    }, {})
  );

  const appBarData = Object.values(
    appsData.reduce((acc, row) => {
      acc[row.item] = acc[row.item] || { name: row.item, count: 0 };
      acc[row.item].count += row.count;
      return acc;
    }, {})
  )
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const titleBarData = Object.values(
    titlesData.reduce((acc, row) => {
      acc[row.item] = acc[row.item] || { name: row.item, count: 0 };
      acc[row.item].count += row.count;
      return acc;
    }, {})
  )
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const deptScoreBarData = deptProductivity.map((d) => ({
    name: d.department,
    score: Number(d.productivity_score.toFixed(2)),
  }));

  const deptStackedBarData = deptProductivity.map((d) => ({
    name: d.department,
    productive: d.productive_events,
    unproductive: d.unproductive_events,
    neutral: d.neutral_events,
  }));

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen space-y-10 transition-colors">
      {/* ✅ Page Header */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Statistics
      </h1>

      {/* ✅ GLOBAL FILTER */}
      <Filter onApply={handleApplyFilters} />

      {loadingApps ? (
        <div className="text-gray-500 dark:text-gray-400 text-center">
          Loading Department Summary.....
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PieChartCard
              title="Department Usage (Apps)"
              data={departmentPieData}
            />

            <BarChartCard
              title="Top 10 Applications"
              data={appBarData}
              dataKeys={{ xAxis: "name", bars: ["count"] }}
            />
          </div>

          <div className="space-y-4">
            <DepartmentLoadHeatmap data={appsData} />
          </div>
        </>
      )}

      {loadingDept ? (
        <div className="text-gray-500 dark:text-gray-400 text-center"></div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChartCard
              title="Department Productivity Score (%)"
              data={deptScoreBarData}
              dataKeys={{ xAxis: "name", bars: ["score"] }}
            />

            <BarChartCard
              title="Department Event Distribution"
              data={deptStackedBarData}
              dataKeys={{
                xAxis: "name",
                bars: ["productive", "unproductive", "neutral"],
              }}
              barColors={{
                productive: "#10B981",
                unproductive: "#EF4444",
                neutral: "#9CA3AF",
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <DepartmentProductivityHeatmap data={deptProductivity} />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {loadingDept ? (
              <div className="text-gray-500 dark:text-gray-400 text-center">
                Loading department productivity…
              </div>
            ) : (
              <ModernAGTable
                title="Department Productivity Summary"
                columns={[
                  "department",
                  "productive_events",
                  "unproductive_events",
                  "neutral_events",
                  "productivity_score",
                  "total_events",
                ]}
                data={deptProductivity}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
