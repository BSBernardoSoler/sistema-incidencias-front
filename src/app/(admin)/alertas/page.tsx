"use client";
import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import VerificadorSesion from '@/components/provider/verificadorSesion'
import React, { useEffect, useState } from 'react'
import TableAlertas from './_components/aletsTable';
import SearchComponentAlertas from './_components/searchComponent';
import Loader from '@/components/common/loader';
import { Alerta } from '@/types/interfaces';




export default function Alertas() {

  const [loading, setLoading] = React.useState<boolean>(false);
  const [recarga, setRecarga] = React.useState<boolean>(false);
  const [alertas, seAlertas] = React.useState<any[]>([]);

     // Paginación
  const [page, setPage] = useState(1);
  const limit = 7; // Puedes ajustar este valor
    const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function getAlertas(){
      setLoading(true);
      const res = await fetch(`/api/alertas?page=${page}&limit=${limit}`, {
        method: 'GET',
      });
      const data = await res.json();
      const alertas: Alerta[] = data.data;
      console.log(alertas);
      seAlertas(alertas);
      // Asumiendo que el API devuelve total como data.total
      if (data.total) {
        setTotalPages(Math.ceil(data.total / limit));
      }
      setLoading(false);
    }
    getAlertas();
  
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
    <VerificadorSesion rolesPermitidos={['admin']}>
       <div>
      <PageBreadcrumb pageTitle="Alertas" />

      <div className="space-y-6">
        <ComponentCard title="Alertas">
          {/* <CreateUserModal users={users} isOpen={createUserModalOpen} recarga={recarga} setRecarga={setRecarga} onClose={() => setCreateUserModalOpen(false)} /> */}
          <div className="flex justify-between items-center mb-4">
            <SearchComponentAlertas alertas={alertas} setAlertas={seAlertas} />
          </div>
          <TableAlertas alertas={alertas} recarga={recarga} setRecarga={setRecarga} />
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
