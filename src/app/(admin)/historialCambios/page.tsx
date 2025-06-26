"use client";
import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import VerificadorSesion from '@/components/provider/verificadorSesion'
import React, { useEffect, useState } from 'react'
import CreateHistorialModal from './_components/CambiosCreateModal'
import { Button } from '@headlessui/react'
import TableHistorial from './_components/historialTable'
import Loader from '@/components/common/loader'
import { Historial} from "@/types/interfaces";



export default function HistorialPage() {
    const [historial, setHistorial] = useState<Historial[]>([]);
    const [createHistorialModalOpen, setCreateHistorialModalOpen] = useState<boolean>(false);
    const [recarga, setRecarga] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


    // Paginación
    const [page, setPage] = useState(1);
    const limit = 7; // Puedes ajustar este valor
    const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
  async function getHistorial(){
    setLoading(true);
    const res = await fetch(`/api/historial?page=${page}&limit=${limit}`);
    const data = await res.json();
    const historial: Historial[] = data.data;
    setHistorial(historial);
    if (data.total) {
      setTotalPages(Math.ceil(data.total / limit));
    }
    setLoading(false);
  }
  getHistorial();

}, [recarga,page]);

     const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }
  return (
   <VerificadorSesion rolesPermitidos={['admin']}> 
    <div>
      <PageBreadcrumb pageTitle="Historial de cambios" />

      <div className="space-y-6">
        <ComponentCard title="Historial de cambios">
          <CreateHistorialModal  isOpen={createHistorialModalOpen} recarga={recarga} setRecarga={setRecarga} onClose={() => setCreateHistorialModalOpen(false)} />
          <div className="flex justify-between items-center mb-4">
           {/* <SearchComponent historial={historial} setHistorial={setHistorial} /> */}
            <Button
              onClick={() => setCreateHistorialModalOpen(true)}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Registrar Cambio
            </Button>
          </div>
          <TableHistorial historial={historial} recarga={recarga} setRecarga={setRecarga} />
           {/* Controles de paginación */}
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <span>Página {page} de {totalPages}</span>
              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
        </ComponentCard>
      </div>
    </div>
    </VerificadorSesion>
  )
}
