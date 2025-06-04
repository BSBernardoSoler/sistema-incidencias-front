"use client";
import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import VerificadorSesion from '@/components/provider/verificadorSesion'
import React, { useEffect, useRef, useState } from 'react'
import TableUsers from './_components/usersTable';
import { User } from '@/types/interfaces';
import SearchComponent from './_components/searchComponent';
import CreateUserModal from './_components/UsersCreateModal';
import Button from '@/components/ui/button/Button';
import Loader from '@/components/common/loader';
import EditUserModal from './_components/UsersEditModal';

export default function Usuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [createUserModalOpen, setCreateUserModalOpen] = useState<boolean>(false);
  const [editUserModalOpen, setEditUserModalOpen] = useState<boolean>(false);
  const [recarga, setRecarga] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userEdit, setUserEdit] = useState<User | null>(null);
    // Paginación
    const [page, setPage] = useState(1);
    const limit = 7; // Puedes ajustar este valor
    const [totalPages, setTotalPages] = useState(1);

useEffect(() => {
  async function getUser(){
    setLoading(true);
    const res = await fetch(`/api/usuarios?page=${page}&limit=${limit}`);
    const data = await res.json();
    
    setUsers(data.data);

    // Asumiendo que el API devuelve total como data.total
      if (data.total) {
        setTotalPages(Math.ceil(data.total / limit));
      }

    setLoading(false);
  }
  getUser();

}, [recarga,page]);


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
      <PageBreadcrumb pageTitle="Usuarios" />

      <div className="space-y-6">
        <ComponentCard title="Usuarios">
          <CreateUserModal users={users} isOpen={createUserModalOpen} recarga={recarga} setRecarga={setRecarga} onClose={() => setCreateUserModalOpen(false)} />
          <EditUserModal  isOpen={editUserModalOpen} recarga={recarga} setRecarga={setRecarga} onClose={() => setEditUserModalOpen(false)} userEdit={userEdit} />
          <div className="flex justify-between items-center mb-4">
            <SearchComponent users={users} setUsers={setUsers} />
            <Button
              onClick={() => setCreateUserModalOpen(true)}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Crear Usuario
            </Button>
          </div>
          <TableUsers users={users} recarga={recarga} setRecarga={setRecarga}  setEditUserModalOpen={setEditUserModalOpen} setUserEdit={setUserEdit} />
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
