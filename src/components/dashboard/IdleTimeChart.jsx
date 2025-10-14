import { useEffect, useState } from "react";
import { BarChartCard } from "../charts/BarChartCard";
import { getIdleTime } from "../../api/dashboardApi";

export default function IdleTimeChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIdleTime();
  }, []);

  const fetchIdleTime = async () => {
    try {
      setLoading(true);
      const res = await getIdleTime();

      // Transform API response into chart-friendly array
      const chartData = [
        {
          metric: "Total Idle Time",
          value: res.data.total_idle,
        },
        {
          metric: "Average Idle Time",
          value: res.data.avg_idle,
        },
      ];

      setData(chartData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch idle time data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading idle time...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <BarChartCard
      title="Idle Time Overview"
      data={data}
      dataKeys={{
        xAxis: "metric", // X-axis uses the metric names
        bars: ["value"], // Only one bar per metric
      }}
    />
  );
}
