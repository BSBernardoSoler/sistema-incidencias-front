"use client";
import ComponentCard from '@/components/common/ComponentCard';
import Loader from '@/components/common/loader';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import VerificadorSesion from '@/components/provider/verificadorSesion'
import { Observacion } from '@/types/interfaces';
import { Button } from '@headlessui/react';
import React, { useEffect, useState } from 'react'
import TableObservaciones from './_components/observacionesTable';
import SearchComponent from './_components/searchComponent';
import CreateObservacionModal from './_components/ObservacionCreateModal';
import ObservacionEditModal from './_components/ObservacionEditModal';

export default function Observaciones() {
  const [observaciones, setObservaciones] = useState<Observacion[]>([]);
  const [createObservacionModalOpen, setCreateObservacionModalOpen] = useState<boolean>(false);
  const [observacion, setObservacion] = useState<Observacion | null>(null);
  const [EditObservacionModalOpen, setEditObservacionModalOpen] = useState<boolean>(false);
  const [recarga, setRecarga] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);


  // Paginación
  const [page, setPage] = useState(1);
  const limit = 7; // Puedes ajustar este valor
  const [totalPages, setTotalPages] = useState(1);
  
useEffect(() => {
  async function getObservaciones(){
    setLoading(true);
    const res = await fetch(`/api/observaciones?page=${page}&limit=${limit}`);
    const data = await res.json();
    const observaciones: Observacion[] = data.data;
    setObservaciones(observaciones);
     if (data.total) {
        setTotalPages(Math.ceil(data.total / limit));
      }
    setLoading(false);
  }
  getObservaciones();

}, [recarga, page]);


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
     <VerificadorSesion rolesPermitidos={['admin', 'digitador', 'doctor']}>
    <div>
      <PageBreadcrumb pageTitle="Observaciones" />

      <div className="space-y-6">
        <ComponentCard title="Observaciones">
          <CreateObservacionModal
            isOpen={createObservacionModalOpen}
            onClose={() => setCreateObservacionModalOpen(false)}
            recarga={recarga}
            setRecarga={setRecarga}
          />
          <ObservacionEditModal
            isOpen={EditObservacionModalOpen}
            onClose={() => setEditObservacionModalOpen(false)}
            recarga={recarga}
            setRecarga={setRecarga}
            observacion={observacion}
          />
          <div className="flex justify-between items-center mb-4">
            <SearchComponent observaciones={observaciones} setObservaciones={setObservaciones} />
            <Button
              onClick={() => setCreateObservacionModalOpen(true)}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Nueva Observación
            </Button>
          </div>
          <TableObservaciones observaciones={observaciones} recarga={recarga} setRecarga={setRecarga} setObservacion={setObservacion} setEditObservacionModalOpen={setEditObservacionModalOpen} />
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
