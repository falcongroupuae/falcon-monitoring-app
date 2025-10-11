import React from "react";

export default function Company() {
  const companies = [
    {
      id: "C001",
      name: "Falcon Group",
      type: "Main Company",
      locations: "Dubai",
      employees: 200,
      email: "info@falcongroupuae.com",
    },
    {
      id: "C002",
      name: "Falcon Laboratory",
      type: "Testing & Calibration",
      locations: "Dubai, Abu Dhabi, Sharjah",
      employees: 120,
      email: "info@falconlabuae.com",
    },
    {
      id: "C003",
      name: "Falcon Survey Engineering",
      type: "Survey & Mapping",
      locations: "Dubai, Abu Dhabi, Sharjah",
      employees: 90,
      email: "info@falconsurvey.ae",
    },
    {
      id: "C004",
      name: "Falcon Geomatics",
      type: "GIS & Geospatial Services",
      locations: "Dubai, Sharjah",
      employees: 70,
      email: "info@falcongeomatics.ae",
    },
    {
      id: "C005",
      name: "FGC Contracting",
      type: "Construction & Contracting",
      locations: "Dubai",
      employees: 110,
      email: "contact@fgccontracting.ae",
    },
    {
      id: "C006",
      name: "BMI Middle East",
      type: "Trading & Industrial Solutions",
      locations: "Dubai",
      employees: 60,
      email: "sales@bmimiddleeast.com",
    },
    {
      id: "C007",
      name: "Ayurmana Ayurvedha",
      type: "Ayurveda & Wellness",
      locations: "Dubai, Sharjah",
      employees: 40,
      email: "care@ayurmana.ae",
    },
    {
      id: "C008",
      name: "Accurate Building Contracting",
      type: "Civil Construction",
      locations: "Dubai",
      employees: 75,
      email: "info@accuratecontracting.ae",
    },
    {
      id: "C009",
      name: "Healthcare Herbal",
      type: "Health & Herbal Products",
      locations: "Dubai",
      employees: 50,
      email: "info@healthcareherbal.ae",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Companies</h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-800 text-sm uppercase font-semibold">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Company Name</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Locations</th>
              <th className="px-6 py-3">Employees</th>
              <th className="px-6 py-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-3">{company.id}</td>
                <td className="px-6 py-3 font-medium text-gray-900">
                  {company.name}
                </td>
                <td className="px-6 py-3">{company.type}</td>
                <td className="px-6 py-3">{company.locations}</td>
                <td className="px-6 py-3">{company.employees}</td>
                <td className="px-6 py-3">{company.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
