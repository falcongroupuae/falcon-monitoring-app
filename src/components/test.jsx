import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Users, Monitor, ChevronDown, LayoutDashboard, BarChart3, Building2, Settings, FileText, Activity, Menu, X, ChevronLeft } from 'lucide-react';

export default function MonitoringDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [dateRange, setDateRange] = useState('09/09/2025 - 09/11/2025');
  const [accountFilter, setAccountFilter] = useState('ACCOUNTS');
  const [userFilter, setUserFilter] = useState('All Users');
  const [deviceFilter, setDeviceFilter] = useState('All Devices');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'statistics', label: 'Statistics', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'company', label: 'Company', icon: Building2 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Top websites data
  const topWebsites = [
    { domain: '192.168.1.2', visits: 2112 },
    { domain: 'mail.google.com', visits: 1664 },
    { domain: 'office.com', visits: 541 },
    { domain: 'whatsapp.com', visits: 243 },
    { domain: 'PDF Viewer', visits: 212 },
    { domain: 'monday.com', visits: 156 }
  ];

  // Total website visited trend
  const websiteTrend = [
    { date: '09/11/2025', domains: 11 },
    { date: '09/10/2025', domains: 15 },
    { date: '09/09/2025', domains: 20 }
  ];

  // Unproductive activity data
  const unproductiveActivity = [
    { day: 'Monday', count: 50 },
    { day: 'Tuesday', count: 80 },
    { day: 'Wednesday', count: 200 },
    { day: 'Thursday', count: 120 },
    { day: 'Friday', count: 0 }
  ];

  // Unproductive activity by user
  const unproductiveUsers = [
    { user: 'MUHAMMED FAZIL P M', count: 78 },
    { user: 'Nayya Sai', count: 65 },
    { user: 'Tenvyon1', count: 60 },
    { user: 'ROBIN', count: 32 },
    { user: 'Roshan', count: 13 },
    { user: 'Reshmi Ravi', count: 10 }
  ];

  // Least productive users data
  const leastProductiveData = [
    { user: 'User1', hours: 120 },
    { user: 'User2', hours: 180 },
    { user: 'User3', hours: 250 },
    { user: 'User4', hours: 320 },
    { user: 'User5', hours: 380 },
    { user: 'User6', hours: 450 },
    { user: 'User7', hours: 520 },
    { user: 'User8', hours: 590 },
    { user: 'User9', hours: 650 },
    { user: 'User10', hours: 700 }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-slate-900 text-white flex flex-col overflow-hidden`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <h1 className={`text-xl font-bold ${sidebarOpen ? 'block' : 'hidden'}`}>MonitorApp</h1>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeMenu === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className={`${sidebarOpen ? 'block' : 'hidden'}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className={`p-4 border-t border-slate-800 ${sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-slate-400">admin@monitor.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          {!sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(true)}
              className="text-slate-600 hover:text-slate-900"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
          <h2 className="text-2xl font-bold text-slate-800 capitalize">{activeMenu}</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg">
              <Settings className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeMenu === 'dashboard' && (
          <div className="p-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-md bg-white">
                <Calendar className="w-4 h-4 text-slate-600" />
                <span className="text-sm text-slate-700">{dateRange}</span>
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-md bg-white hover:bg-slate-50">
                <Users className="w-4 h-4 text-slate-600" />
                <span className="text-sm text-slate-700">{accountFilter}</span>
                <ChevronDown className="w-4 h-4 text-slate-600" />
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-md bg-white hover:bg-slate-50">
                <Users className="w-4 h-4 text-slate-600" />
                <span className="text-sm text-slate-700">{userFilter}</span>
                <ChevronDown className="w-4 h-4 text-slate-600" />
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-md bg-white hover:bg-slate-50">
                <Monitor className="w-4 h-4 text-slate-600" />
                <span className="text-sm text-slate-700">{deviceFilter}</span>
                <ChevronDown className="w-4 h-4 text-slate-600" />
              </button>
              
              <div className="ml-auto flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
                  Apply
                </button>
                <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 text-sm font-medium">
                  Clear All
                </button>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Top Websites Visited */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Top Websites Visited</h2>
                  <button className="text-sm text-slate-600 hover:text-slate-800">Table ▼</button>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 text-sm font-medium text-slate-600 pb-2 border-b">
                    <span>Domain Name</span>
                    <span className="text-right">Website Visits (Count)</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {topWebsites.map((site, idx) => (
                      <div key={idx} className="grid grid-cols-2 py-3 text-sm hover:bg-slate-50 rounded">
                        <span className="text-slate-700">{site.domain}</span>
                        <span className="text-right text-slate-700 font-medium">{site.visits}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Total Website Visited Trend */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Total Website Visited Trend</h2>
                  <button className="text-sm text-slate-600 hover:text-slate-800">Table ▼</button>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 text-sm font-medium text-slate-600 pb-2 border-b">
                    <span>Date</span>
                    <span className="text-right">Domains</span>
                  </div>
                  {websiteTrend.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-2 py-3 text-sm hover:bg-slate-50 rounded">
                      <span className="text-slate-700">{item.date}</span>
                      <span className="text-right text-slate-700 font-medium">{item.domains}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unproductive Activity */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Unproductive Activity</h2>
                  <button className="text-sm text-slate-600 hover:text-slate-800">Bar ▼</button>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={unproductiveActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Unproductive App Activity By Time */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Unproductive App Activity By Time</h2>
                  <button className="text-sm text-slate-600 hover:text-slate-800">Table ▼</button>
                </div>
                <div className="flex items-center justify-center h-64 text-slate-500">
                  No Data Available
                </div>
              </div>

              {/* Unproductive Activity by User */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Unproductive Activity by User</h2>
                  <button className="text-sm text-slate-600 hover:text-slate-800">Table ▼</button>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 text-sm font-medium text-slate-600 pb-2 border-b">
                    <span>Users</span>
                    <span className="text-right">Unproductive Count</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {unproductiveUsers.map((user, idx) => (
                      <div key={idx} className="grid grid-cols-2 py-3 text-sm hover:bg-slate-50 rounded">
                        <span className="text-slate-700">{user.user}</span>
                        <span className="text-right text-slate-700 font-medium">{user.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Least Productive Users */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Least Productive Users</h2>
                  <button className="text-sm text-slate-600 hover:text-slate-800">Bar ▼</button>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={leastProductiveData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="user" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Other Menu Content Placeholders */}
        {activeMenu !== 'dashboard' && (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <h3 className="text-2xl font-semibold text-slate-800 mb-2 capitalize">{activeMenu}</h3>
              <p className="text-slate-600">This section is under development</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}