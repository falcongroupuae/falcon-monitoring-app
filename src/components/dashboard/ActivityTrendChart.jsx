import { useEffect, useState } from "react";
import { LineChartCard } from "../charts/LineChartCard";
import { getActivityTrend } from "../../api/dashboardApi";

export default function ActivityTrendChart({ filters }) {
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const keyMap = {
    total_activity_time: "Total Activity Time",
    total_idle_time: "Total Idle Time",
  };

  useEffect(() => {
    fetchTrend();
  }, [filters]);

  const fetchTrend = async () => {
    try {
      setLoading(true);
      const res = await getActivityTrend(filters);
      const rawTrend = res.data.trend || [];

      // Transform keys to friendly labels for display
      const formattedTrend = rawTrend.map(item => {
        const newItem = { activity_date: item.activity_date };
        Object.keys(keyMap).forEach(key => {
          newItem[keyMap[key]] = item[key]; // rename keys
        });
        return newItem;
      });

      setTrend(formattedTrend);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load trend");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading trend...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <LineChartCard
      title="Activity Trend"
      data={trend}
      dataKeys={{
        xAxis: "activity_date",
        lines: Object.values(keyMap), 
      }}
    />
  );
}
