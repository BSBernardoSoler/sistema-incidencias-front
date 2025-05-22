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

export default function Registros() {

  const [registros, setRegistros] = useState<RegistroDetalle[]>([]);
  const [createRegistroModalOpen, setCreateRegistroModalOpen] = useState<boolean>(false);
  const [recarga, setRecarga] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

useEffect(() => {
  async function getRegistros(){
    setLoading(true);
    const res = await fetch('/api/registros',{
      method: 'GET',
     
    });
    const data = await res.json();
    const registros: RegistroDetalle[] = data.data;
    console.log(registros);
    setRegistros(registros);
    setLoading(false);
  }
  getRegistros();

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
      <PageBreadcrumb pageTitle="Registros" />

      <div className="space-y-6">
        <ComponentCard title="Registros">
          {/* <CreateHistorialModal historial={historial} isOpen={createHistorialModalOpen} recarga={recarga} setRecarga={setRecarga} onClose={() => setCreateHistorialModalOpen(false)} /> */}
          <div className="flex justify-between items-center mb-4">
            <SearchComponent registros={registros} setRegistros={setRegistros} />
            <Button
              onClick={() => setCreateRegistroModalOpen(true)}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Nuevo Registro
            </Button>
          </div>
          <TableRegistros registros={registros} recarga={recarga} setRecarga={setRecarga} />
        </ComponentCard>
      </div>
    </div>
    </VerificadorSesion>
  )
}
