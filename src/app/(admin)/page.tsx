import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import { PdfExport } from "@/components/ecommerce/PdfExport";

export const metadata: Metadata = {
  title:
    "Sistema de Gestión de Incidencias - Next.js Admin Dashboard Template",
  description: "Sistema de Gestión de Incidencias - Next.js Admin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />
        
        
        <StatisticsChart />

       
  
      </div>

     


      <div className="col-span-12 xl:col-span-5">
          <MonthlySalesChart />

           <PdfExport />
      </div>

    </div>
  );
}
