"use client";

import { useState, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
  iconSetQuartzBold,
} from "ag-grid-community";
import { FaExpand, FaTimes } from "react-icons/fa";

ModuleRegistry.registerModules([AllCommunityModule]);

const agTheme = themeQuartz
  .withPart(iconSetQuartzBold)

  // 🌞 LIGHT MODE
  .withParams(
    {
      backgroundColor: "#ffffff",
      foregroundColor: "#000000",
      cellTextColor: "#000000",
      headerTextColor: "#000000",
      headerBackgroundColor: "#F9FAFB",
      borderColor: "#00000026",
      browserColorScheme: "light",
    },
    "light"
  )

  // 🌙 DARK MODE (gray-800)
  .withParams(
    {
      backgroundColor: "#1f2937", // gray-800
      dataBackgroundColor: "#1f2937",
      chromeBackgroundColor: "#1f2937",
      headerBackgroundColor: "#1f2937",
      oddRowBackgroundColor: "#1f2937",

      borderColor: "#374151", // gray-700

      foregroundColor: "#f3f4f6", // gray-100
      cellTextColor: "#f3f4f6",
      headerTextColor: "#f3f4f6",

      browserColorScheme: "dark",
    },
    "dark"
  );

export default function ModernAGTable({ title, columns, data, onRowClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDark, setIsDark] = useState(false);

  /* ✅ SYNC WITH TAILWIND DARK */
  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.classList.contains("dark"));

    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  /* ✅ COLUMN DEFINITIONS */
  const columnDefs = useMemo(() => {
    return columns.map((col) =>
      typeof col === "string"
        ? {
            headerName: col.charAt(0).toUpperCase() + col.slice(1),
            field: col,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
            minWidth: 120,
          }
        : {
            headerName:
              col.headerName ||
              col.field.charAt(0).toUpperCase() + col.field.slice(1),
            field: col.field,
            sortable: col.sortable ?? true,
            filter: col.filter ?? true,
            resizable: col.resizable ?? true,
            flex: col.flex ?? 1,
            minWidth: col.minWidth ?? 120,
            cellRenderer: col.cellRenderer,
          }
    );
  }, [columns]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "px-3 py-2",
    }),
    []
  );

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 flex flex-col">
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-t-2xl flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h3>
          <button
            onClick={() => setIsExpanded(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <FaExpand className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div
          data-ag-theme-mode={isDark ? "dark" : "light"}
          className="w-full h-[800px] relative rounded-b-2xl flex-none shadow-lg overflow-hidden"
        >
          <AgGridReact
            key={isDark ? "dark" : "light"}
            theme={agTheme}
            rowData={data}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowHeight={70}
            headerHeight={40}
            pagination
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50]}
            onRowClicked={(e) => onRowClick?.(e.data)}
          />
        </div>
      </div>

      {/* ✅ EXPANDED MODAL */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 bg-gray-50 dark:bg-slate-800 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {title}
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <FaTimes className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div
              data-ag-theme-mode={isDark ? "dark" : "light"}
              className="p-6 h-[70vh]"
            >
              <AgGridReact
                key={`expanded-${isDark}`}
                theme={agTheme}
                rowData={data}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowHeight={80}
                headerHeight={40}
                pagination
                paginationPageSize={20}
                paginationPageSizeSelector={[20, 50, 100]}
                onRowClicked={(e) => onRowClick?.(e.data)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
