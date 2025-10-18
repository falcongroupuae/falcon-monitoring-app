import { useEffect, useState } from "react";
import Table from "../tables/Table";
import { getAgentSummary } from "../../api/dashboardApi";

export default function AgentSummaryTable({ filters }) {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAgents();
  }, [filters]);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const res = await getAgentSummary(filters);
      setAgents(res.data?.agents || []);
      setError(null);
    } catch (err) {
      console.error("Agent fetch failed:", err);
      // Detect network or CORS errors
      if (!err.response) {
        setError("Cannot connect to server. Data may not be available.");
      } else {
        setError("Failed to load agent data");
      }
      setAgents([]); // fallback empty
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading agents...</div>;
  if (error)
    return (
      <div className="p-4 bg-yellow-50 text-yellow-700 rounded">
        {error}
      </div>
    );

  return (
    <Table
      title="Agent Summary"
      columns={["agent_id", "agent_name", "total_site_time", "total_app_time", "total_idle", "total_events"]}
      data={agents}
    />
  );
}
