"use client"
import ComponentCard from '@/components/common/ComponentCard';
import Loader from '@/components/common/loader';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import VerificadorSesion from '@/components/provider/verificadorSesion'
import { RegistroDetalle } from '@/types/interfaces';
import { Button } from '@headlessui/react';
import React, { useEffect, useState } from 'react'
import TableRegistros from './_components/registrosTable';
import SearchComponent from './_components/searchComponet';
import CreateRegistroModal from './_components/registrosCreateModal';
import EditRegistroModal from './_components/registrosEditModal';

export default function Registros() {

  const [registros, setRegistros] = useState<RegistroDetalle[]>([]);
  const [createRegistroModalOpen, setCreateRegistroModalOpen] = useState<boolean>(false);
  const [editRegistroModalOpen, setEditRegistroModalOpen] = useState<boolean>(false);
  const [selectedRegistro, setSelectedRegistro] = useState<RegistroDetalle | null>(null);
  // Estado para recargar los registros
  const [recarga, setRecarga] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

    // Paginación
    const [page, setPage] = useState(1);
    const limit = 7; // Puedes ajustar este valor
    const [totalPages, setTotalPages] = useState(1);

useEffect(() => {
  async function getRegistros(){
    setLoading(true);
    const res = await fetch(`/api/registros?page=${page}&limit=${limit}`,{
      method: 'GET',
     
    });
    const data = await res.json();
    const registros: RegistroDetalle[] = data.data;
  
    setRegistros(registros);

       // Asumiendo que el API devuelve total como data.total
      if (data.total) {
        setTotalPages(Math.ceil(data.total / limit));
      }
    setLoading(false);
  }
  getRegistros();

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
      <VerificadorSesion rolesPermitidos={['admin', 'digitador']}>
    <div>
      <PageBreadcrumb pageTitle="Registros" />

      <div className="space-y-6">
        <ComponentCard title="Registros">
          <CreateRegistroModal isOpen={createRegistroModalOpen} recarga={recarga} setRecarga={setRecarga} onClose={() => setCreateRegistroModalOpen(false)} users={[]} />
           <EditRegistroModal isOpen={editRegistroModalOpen} onClose={() => setEditRegistroModalOpen(false)} registro={selectedRegistro} recarga={recarga} setRecarga={setRecarga} users={[]} />
          <div className="flex justify-between items-center mb-4">
            <SearchComponent registros={registros} setRegistros={setRegistros} />
            <Button
              onClick={() => setCreateRegistroModalOpen(true)}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Nuevo Registro
            </Button>
          </div>
          <TableRegistros registros={registros} recarga={recarga} setRecarga={setRecarga} setEditRegistroModalOpen={setEditRegistroModalOpen} setSelectedRegistro={setSelectedRegistro} />
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
