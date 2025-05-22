"use client";
import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import VerificadorSesion from '@/components/provider/verificadorSesion'
import React, { useEffect } from 'react'
import TableAlertas from './_components/aletsTable';
import SearchComponentAlertas from './_components/searchComponent';
import Loader from '@/components/common/loader';
import { Alerta } from '@/types/interfaces';




export default function Alertas() {

  const [loading, setLoading] = React.useState<boolean>(false);
  const [recarga, setRecarga] = React.useState<boolean>(false);
  const [alertas, seAlertas] = React.useState<any[]>([]);

  useEffect(() => {
    async function getAlertas(){
      setLoading(true);
      const res = await fetch('/api/alertas', {
        method: 'GET',
      });
      const data = await res.json();
      const alertas: Alerta[] = data;
      console.log(alertas);
      seAlertas(alertas);
      setLoading(false);
    }
    getAlertas();
  
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
      <PageBreadcrumb pageTitle="Alertas" />

      <div className="space-y-6">
        <ComponentCard title="Alertas">
          {/* <CreateUserModal users={users} isOpen={createUserModalOpen} recarga={recarga} setRecarga={setRecarga} onClose={() => setCreateUserModalOpen(false)} /> */}
          <div className="flex justify-between items-center mb-4">
            <SearchComponentAlertas alertas={alertas} setAlertas={seAlertas} />
          </div>
          <TableAlertas alertas={alertas} recarga={recarga} setRecarga={setRecarga} />
        </ComponentCard>
      </div>
    </div>
    </VerificadorSesion>
  )
}
