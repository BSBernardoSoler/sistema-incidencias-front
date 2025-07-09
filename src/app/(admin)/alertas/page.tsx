'use client';

import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import VerificadorSesion from '@/components/provider/verificadorSesion';
import React, { useEffect, useState } from 'react';
import TableAlertas from './_components/aletsTable';
import Loader from '@/components/common/loader';
import { useDispatch, useSelector } from 'react-redux';
import { setAlerts, addAlert } from '../../../redux/store/alertsSlice';
import { RootState } from '@/redux/store/store';
import socket from '@/lib/socket';

export default function Alertas() {
  const [loading, setLoading] = useState<boolean>(false);
  const [recarga, setRecarga] = useState<boolean>(false);

  const [page, setPage] = useState(1);
  const limit = 7;
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();
  const alertas = useSelector((state: RootState) => state.alert.items);

  useEffect(() => {
    async function getAlertas() {
      setLoading(true);
      try {
        const res = await fetch(`/api/alertas?page=${page}&limit=${limit}`);
        const data = await res.json();
        if (data.data) {
          dispatch(setAlerts(data.data));
        }
        if (data.total) {
          setTotalPages(Math.ceil(data.total / limit));
        }
      } catch (error) {
        console.error('Error al obtener alertas:', error);
      } finally {
        setLoading(false);
      }
    }

    getAlertas();
  }, [recarga, page, dispatch]);


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
    <VerificadorSesion rolesPermitidos={['admin', 'doctor', 'digitador']}>
      <div>
        <PageBreadcrumb pageTitle="Alertas" />
        <div className="space-y-6">
          <ComponentCard title="Alertas">
            <TableAlertas alertas={alertas} recarga={recarga} setRecarga={setRecarga} />
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
  );
}
