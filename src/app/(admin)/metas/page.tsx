"use client";
import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import VerificadorSesion from '@/components/provider/verificadorSesion'
import { Button } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import TableMetas from './_components/metasTable'
import { Meta } from '@/types/interfaces'
import Loader from '@/components/common/loader'
import CreateMetasModal from './_components/MetasCreateModal'
import MetasEditModal from './_components/MetasEditModal';

export default function Metas() {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [createMetaModalOpen, setCreateMetaModalOpen] = useState(false);
  const [editMetaModalOpen, setEditMetaModalOpen] = useState(false);
  const [selectedMetaEdit, setSelectedMetaEdit] = useState<Meta | null>(null);
  const [recarga, setRecarga] = useState(false);
  const [loading, setLoading] = useState(false);

  // Paginación
  const [page, setPage] = useState(1);
  const limit = 7; // Puedes ajustar este valor
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function getMetas() {
      setLoading(true);
      const res = await fetch(`/api/metas?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setMetas(data.data);

      // Asumiendo que el API devuelve total como data.total
      if (data.total) {
        setTotalPages(Math.ceil(data.total / limit));
      }

      setLoading(false);
    }

    getMetas();
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
        <PageBreadcrumb pageTitle="Metas" />
        <div className="space-y-6">
          <CreateMetasModal
            metas={metas}
            isOpen={createMetaModalOpen}
            onClose={() => setCreateMetaModalOpen(false)}
            recarga={recarga}
            setRecarga={setRecarga}
          />
          {selectedMetaEdit && (
            <MetasEditModal
              isOpen={editMetaModalOpen}
              onClose={() => setEditMetaModalOpen(false)}
              meta={selectedMetaEdit}
              recarga={recarga}
              setRecarga={setRecarga}
            />
          )}

          {/* Tabla de Metas */}
          <ComponentCard title="Metas">
            <div className="flex justify-between items-center mb-4">
              <Button
                onClick={() => setCreateMetaModalOpen(true)}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Registrar Meta
              </Button>
            </div>

            <TableMetas metas={metas} recarga={recarga} setRecarga={setRecarga} setSelectedMetaEdit={setSelectedMetaEdit}  setEditMetaModalOpen={setEditMetaModalOpen} />

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
  );
}
