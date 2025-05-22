"use client";
import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import VerificadorSesion from '@/components/provider/verificadorSesion'
import { Button } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import TableMetas from './_components/metasTable'
import { Meta } from '@/types/interfaces'
import Loader from '@/components/common/loader'

export default function Metas() {
    const [metas, setMetas] = useState<Meta[]>([]);
  const [createMetaModalOpen, setCreateMetaModalOpen] = useState<boolean>(false);
  const [recarga, setRecarga] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

useEffect(() => {
  async function getMetas(){
    setLoading(true);
    const res = await fetch('/api/metas');
    const data = await res.json();
    setMetas(data.data);
    setLoading(false);
  }
  getMetas();

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
      <PageBreadcrumb pageTitle="Metas" />

      <div className="space-y-6">
        <ComponentCard title="Metas">
          {/* <CreateHistorialModal historial={historial} isOpen={createHistorialModalOpen} recarga={recarga} setRecarga={setRecarga} onClose={() => setCreateHistorialModalOpen(false)} /> */}
          <div className="flex justify-between items-center mb-4">
           {/* <SearchComponent historial={historial} setHistorial={setHistorial} /> */}
            <Button
              onClick={() => setCreateMetaModalOpen(true)}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Registrar Meta
            </Button>
          </div>
          <TableMetas metas={metas} recarga={recarga} setRecarga={setRecarga} />
        </ComponentCard>
      </div>
    </div>
    </VerificadorSesion>
  )
}
