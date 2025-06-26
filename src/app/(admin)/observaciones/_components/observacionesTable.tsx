"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

import Badge from "../../../../components/ui/badge/Badge";
import { Observacion, User } from "@/types/interfaces";
import SelectActions from "./selectActions";




interface TableObservacionesProps {
  observaciones: Observacion[];
  recarga: boolean;
  setRecarga: React.Dispatch<React.SetStateAction<boolean>>; 
  setEditObservacionModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;  
  setObservacion?: React.Dispatch<React.SetStateAction<Observacion | null>>; 
}
export default function TableObservaciones({ observaciones, recarga, setRecarga, setEditObservacionModalOpen, setObservacion }: TableObservacionesProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Usuario
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Detalle Observación
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Estado
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Fecha Observación
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Respuesta Digitador
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Fecha Respuesta
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Acciones
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {observaciones.map((obs) => (
                <TableRow key={obs.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {obs.usuarioReporta.nombres} {obs.usuarioReporta.apellidos}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {obs.usuarioReporta.dni}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {obs.detalle_observacion}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        obs.estado === 1
                          ? "error"
                          : obs.estado === 2
                          ? "warning"
                          : "success"
                      }
                    >
                      {obs.estado === 1
                        ? "Pendiente"
                        : obs.estado === 2
                        ? "En Proceso"
                        : "Resuelto"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {obs.fecha_observacion
                      ? new Date(obs.fecha_observacion).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      : "-"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {obs.respuesta_digitador || "-"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {obs.fecha_respuesta
                      ? new Date(obs.fecha_respuesta).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <SelectActions
                      observacion={obs}
                      recarga={recarga}
                      isActive={obs.estado !== 0}
                      setRecarga={setRecarga}
                      setEditObservacionModalOpen={setEditObservacionModalOpen}
                      setObservacion={setObservacion}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
