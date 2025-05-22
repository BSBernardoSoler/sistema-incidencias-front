"use client";
import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import VerificadorSesion from '@/components/provider/verificadorSesion'
import React, { useEffect, useState } from 'react'
import CreateHistorialModal from './_components/UsersCreateModal'
import { Button } from '@headlessui/react'
import TableHistorial from './_components/historialTable'
import Loader from '@/components/common/loader'
import { Historial} from "@/types/interfaces";



export default function HistorialPage() {
    const [historial, setHistorial] = useState<Historial[]>([]);
    const [createHistorialModalOpen, setCreateHistorialModalOpen] = useState<boolean>(false);
    const [recarga, setRecarga] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
  async function getHistorial(){
    setLoading(true);
    const res = await fetch('/api/historial');
    const data = await res.json();
    const historial: Historial[] = data;
    setHistorial(historial);
    setLoading(false);
  }
  getHistorial();

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
      <PageBreadcrumb pageTitle="Historial de cambios" />

      <div className="space-y-6">
        <ComponentCard title="Historial de cambios">
          <CreateHistorialModal historial={historial} isOpen={createHistorialModalOpen} recarga={recarga} setRecarga={setRecarga} onClose={() => setCreateHistorialModalOpen(false)} />
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
        </ComponentCard>
      </div>
    </div>
    </VerificadorSesion>
  )
}
