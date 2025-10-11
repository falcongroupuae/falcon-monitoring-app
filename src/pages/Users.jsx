"use client";
import React from "react";

export default function Users() {
  const users = [
    {
      id: "A001",
      name: "Ansil Rahman",
      email: "ansil@falconlabuae.com",
      department: "Digital Marketing",
      desktop_id: "DESKTOP-01",
      active_hours: 5.2,
    },
    {
      id: "A002",
      name: "Mohammed Fahad",
      email: "fahad@falconlabuae.com",
      department: "Productivity Monitoring",
      desktop_id: "DESKTOP-02",
      active_hours: 7.1,
    },
    {
      id: "A003",
      name: "Yadu Krishnan",
      email: "yadu@falconlabuae.com",
      department: "Purchase",
      desktop_id: "DESKTOP-03",
      active_hours: 6.4,
    },
    {
      id: "A004",
      name: "Adrita",
      email: "adrita@falconlabuae.com",
      department: "Digital Marketing",
      desktop_id: "DESKTOP-04",
      active_hours: 4.8,
    },
    {
      id: "A005",
      name: "user1",
      email: "user1@falconlabuae.com",
      department: "IT",
      desktop_id: "DESKTOP-05",
      active_hours: 8.0,
    },
    {
      id: "A006",
      name: "user2",
      email: "user2@falconlabuae.com",
      department: "Lab",
      desktop_id: "DESKTOP-05",
      active_hours: 8.0,
    },
    {
      id: "A007",
      name: "user3",
      email: "user3@falconlabuae.com",
      department: "Survey",
      desktop_id: "DESKTOP-05",
      active_hours: 8.0,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Users</h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-800 text-sm uppercase font-semibold">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Desktop ID</th>
              <th className="px-6 py-3 text-right">Active Hours</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-3">{user.id}</td>
                <td className="px-6 py-3 font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.department}</td>
                <td className="px-6 py-3">{user.desktop_id}</td>
                <td className="px-6 py-3 text-right">{user.active_hours} hrs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
