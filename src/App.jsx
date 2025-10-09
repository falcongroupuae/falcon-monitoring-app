import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import Header from "./components/common/Header";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/Statistics";
import Users from "./pages/Users";
import Company from "./pages/Company";
import Reports from "./pages/Reports";
import Activity from "./pages/Activity";

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header onToggleSidebar={toggleSidebar} />
          
          {/* Page Content */}
          <main className="flex-1 bg-gray-50 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/users" element={<Users />} />
              <Route path="/company" element={<Company />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/activity" element={<Activity />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}