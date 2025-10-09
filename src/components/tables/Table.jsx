import { useState } from "react";
import { FaExpand, FaTimes } from "react-icons/fa";

export default function Table({ title, columns, data }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={() => setIsExpanded(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
            title="Expand table"
          >
            <FaExpand className="text-gray-500 group-hover:text-blue-600 transition-colors" />
          </button>
        </div>
        
        {/* Table Container */}
        <div className="overflow-x-auto flex-1">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {columns.map((col) => (
                  <th 
                    key={col} 
                    className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((row, idx) => (
                <tr 
                  key={idx} 
                  className="hover:bg-blue-50/50 transition-colors duration-150 group"
                >
                  {columns.map((col) => (
                    <td 
                      key={col} 
                      className="py-4 px-6 text-sm text-gray-700 group-hover:text-gray-900"
                    >
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg 
                className="w-8 h-8 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
                />
              </svg>
            </div>
            <h4 className="text-sm font-medium text-gray-900 mb-1">No data available</h4>
            <p className="text-sm text-gray-500">There are no records to display at this time.</p>
          </div>
        )}
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col animate-in">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between rounded-t-2xl">
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                title="Close"
              >
                <FaTimes className="text-gray-500 group-hover:text-red-600 transition-colors text-lg" />
              </button>
            </div>
            
            {/* Modal Table Container */}
            <div className="overflow-auto flex-1 p-6">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {columns.map((col) => (
                      <th 
                        key={col} 
                        className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-50"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((row, idx) => (
                    <tr 
                      key={idx} 
                      className="hover:bg-blue-50/50 transition-colors duration-150 group"
                    >
                      {columns.map((col) => (
                        <td 
                          key={col} 
                          className="py-4 px-6 text-sm text-gray-700 group-hover:text-gray-900"
                        >
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}