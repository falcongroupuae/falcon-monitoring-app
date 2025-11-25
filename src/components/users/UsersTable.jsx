import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../../api/usersApi";
import ModernAGTable from "../tables/AGTable";

import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import ProductivityCell from "./ProductivityCell";

export default function UsersTable({ filters }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const formatDate = (iso) => {
    if (!iso) return "-";
    return new Date(iso).toLocaleString();
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setHasError(false);

      const res = await getUsers(filters);
      if (!Array.isArray(res.data)) throw new Error("Invalid API response");

      const mapped = res.data.map((u) => ({
        agent_code: u.agent_code,
        name: u.name,
        department: u.department,
        first_seen: formatDate(u.first_seen_at),
        last_seen: formatDate(u.last_seen_at),
        productivity: u.agent_code,
      }));

      setUsers(mapped);
    } catch (err) {
      console.error(err);
      setHasError(true);
      toast.error("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const LoadingRow = [
    {
      agent_code: <FaSpinner className="animate-spin" />,
      name: "...",
      department: "...",
      first_seen: "...",
      last_seen: "...",
      productivity: "...",
    },
  ];

  const ErrorRow = [
    {
      agent_code: <FaExclamationTriangle className="text-red-500" />,
      name: "Error",
      department: "-",
      first_seen: "-",
      last_seen: "-",
      productivity: "-",
    },
  ];

  const finalRows = loading ? LoadingRow : hasError ? ErrorRow : users;

  const columns = [
    { field: "agent_code", headerName: "Agent Code" },
    { field: "name", headerName: "Name" },
    { field: "department", headerName: "Department" },
    { field: "first_seen", headerName: "First Seen" },
    { field: "last_seen", headerName: "Last Seen" },
    {
      field: "productivity",
      headerName: "Productivity",
      minWidth: 150,
      cellRenderer: (params) => <ProductivityCell agentCode={params.value} />,
    },
  ];

  return (
    <ModernAGTable
      title="Users List"
      columns={columns}
      data={finalRows}
      onRowClick={(row) => navigate(`/users/${row.agent_code}`)}
    />
  );
}
