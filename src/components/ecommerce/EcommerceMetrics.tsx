"use client";
import React, { useEffect, useState } from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "@/icons";
import { ca } from "date-fns/locale";
import { set } from "date-fns";




export const EcommerceMetrics = () => {
  const [users, setUsers] = useState(0);
  const [registros, setRegistros] = useState(0);
  const [errores, setErrores] = useState(0);
  const [correcciones, setCorrecciones] = useState(0);  

  useEffect(() => {
    const response = async () => {
      const res = await fetch("/api/usuarios/count", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resgistros = await fetch("/api/registros/count", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      
      const err = await fetch("/api/observaciones/count", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

         const cam = await fetch("/api/historial/count", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const correcciones = await cam.json();
      const observaciones = await err.json();
     const  registros = await resgistros.json();
      const data = await res.json();
      console.log(data);
      setUsers(Number(data.count) || 0);
      setRegistros(Number(registros.count) || 0);
      setErrores(Number(observaciones.count) || 0);
      setCorrecciones(Number(correcciones.count) || 0);
    };

    response();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Usuarios
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {users}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Errores
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {errores}
            </h4>
          </div>

        </div>
      </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Correcciones
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {correcciones}
            </h4>
          </div>

        
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Registros de hoy
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {registros}
            </h4>
          </div>

        
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
