"use client";

import { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule, themeQuartz, iconSetQuartzBold } from "ag-grid-community";
import { FaExpand, FaTimes } from "react-icons/fa";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Your custom theme
const myTheme = themeQuartz
  .withPart(iconSetQuartzBold)
  .withParams({
    backgroundColor: "#ffffff",
    borderColor: "#00000026",
    borderRadius: 0,
    browserColorScheme: "light",
    columnBorder: false,
    fontFamily: "Arial",
    foregroundColor: "#000000",
    headerBackgroundColor: "#F9FAFB",
    headerFontFamily: "inherit",
    headerFontSize: 14,
    headerFontWeight: 700,
    headerTextColor: "#000000",
    headerVerticalPaddingScale: 1.2,
    oddRowBackgroundColor: "#F9FAFB",
    rowBorder: true,
    sidePanelBorder: false,
    spacing: 10,
    wrapperBorder: false,
    wrapperBorderRadius: 5,
  });

export default function ModernAGTable({ title, columns, data }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const columnDefs = useMemo(
    () =>
      columns.map((col) => ({
        headerName: col.charAt(0).toUpperCase() + col.slice(1),
        field: col,
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        minWidth: 120,
      })),
    [columns]
  );

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    cellClass: "px-3 py-2",
  }), []);

  const tableStyle = "w-full h-full rounded-2xl shadow-lg overflow-hidden";

  return (
    <>
      {/* Card container */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-full">
        {/* Header */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={() => setIsExpanded(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FaExpand className="text-gray-500 hover:text-blue-600" />
          </button>
        </div>

        {/* AG Grid Table */}
        <div className={tableStyle} style={{ minHeight: "350px" }}>
          <AgGridReact
            rowData={data}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50]}
            domLayout="autoHeight"
            theme={myTheme} 
          />
        </div>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
              </svg>
            </div>
            <h4 className="text-lg font-medium">No data available</h4>
            <p className="text-sm text-gray-400">There are no records to display at this time.</p>
          </div>
        )}
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col animate-in">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              <button onClick={() => setIsExpanded(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FaTimes className="text-gray-500 hover:text-red-600 text-lg" />
              </button>
            </div>

            {/* Modal Table */}
            <div className={`${tableStyle} flex-1 p-6`} style={{ height: "70vh" }}>
              <AgGridReact
                rowData={data}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={20}
                paginationPageSizeSelector={[20, 50, 100]}
                theme={myTheme}  
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
