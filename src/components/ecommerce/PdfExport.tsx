"use client";
import React, { useEffect, useState } from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon,FileIcon } from "@/icons";





export const PdfExport = () => {



  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
   <a href={`/api/reportes/observaciones`} className="no-underline">
       <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FileIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Reporte de observaciones
            </span>
           
          </div>
        </div>
      </div>
   </a>
      {/* <!-- Metric Item Start --> */}
      <a href={`/api/reportes/productividad`} className="no-underline">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FileIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Reporte Productividad
            </span>
         
          </div>

        </div>
      </div>
     </a>

       <a href={`/api/reportes/metas`} className="no-underline">
         <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FileIcon className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Reporte de metas
            </span>
          
          </div>

        
        </div>
      </div>
       </a>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
     <a href={`/api/reportes/alertas`} className="no-underline">
       <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FileIcon className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Reportes de alertas
            </span>
           
          </div>

        
        </div>
      </div>
     </a>
      {/* <!-- Metric Item End --> */}
         <a href={`/api/reportes/cambios`} className="no-underline">
          <div  className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 ">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FileIcon className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5 ">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Reportes de cambios
            </span>
        
          </div>

        
        </div>
      </div>
         </a>
    </div>
  );
};
