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

export default function Observaciones() {
  const [observaciones, setObservaciones] = useState<Observacion[]>([]);
  const [createObservacionModalOpen, setCreateObservacionModalOpen] = useState<boolean>(false);
  const [recarga, setRecarga] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

useEffect(() => {
  async function getObservaciones(){
    setLoading(true);
    const res = await fetch('/api/observaciones');
    const data = await res.json();
    const observaciones: Observacion[] = data;
    setObservaciones(observaciones);
    setLoading(false);
  }
  getObservaciones();

}, [recarga]);
  
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
      <PageBreadcrumb pageTitle="Observaciones" />

      <div className="space-y-6">
        <ComponentCard title="Observaciones">
          {/* <CreateUserModal users={users} isOpen={createUserModalOpen} recarga={recarga} setRecarga={setRecarga} onClose={() => setCreateUserModalOpen(false)} /> */}
          <div className="flex justify-between items-center mb-4">
            <SearchComponent observaciones={observaciones} setObservaciones={setObservaciones} />
            <Button
              onClick={() => setCreateObservacionModalOpen(true)}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Nueva Observación
            </Button>
          </div>
          <TableObservaciones observaciones={observaciones} recarga={recarga} setRecarga={setRecarga} />
        </ComponentCard>
      </div>
    </div>
    </VerificadorSesion>
  )
}
