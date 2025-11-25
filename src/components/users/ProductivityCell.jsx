import { useEffect, useState } from "react";
import MiniPieChart from "../charts/MiniPieChart";
import { getUserProductivity } from "../../api/usersApi"; 
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";

export default function ProductivityCell({ agentCode }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!agentCode) return;
    fetchProductivity();
  }, [agentCode]);

  const fetchProductivity = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await getUserProductivity(agentCode);

      const d = res.data;

      setChartData([
        { label: "Productive", value: d.productive_seconds },
        { label: "Unproductive", value: d.unproductive_seconds },
        { label: "Neutral", value: d.neutral_seconds },
      ]);
    } catch (err) {
      console.error("Productivity fetch failed:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <FaSpinner className="animate-spin text-gray-400 text-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center">
        <FaExclamationTriangle
          className="text-red-500 text-lg"
          title="Failed to load productivity"
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <MiniPieChart data={chartData} />
    </div>
  );
}
