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

export default function Usuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [createUserModalOpen, setCreateUserModalOpen] = useState<boolean>(false);
  const [recarga, setRecarga] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

useEffect(() => {
  async function getUser(){
    setLoading(true);
    const res = await fetch('/api/usuarios');
    const data = await res.json();
    setUsers(data.data);
    setLoading(false);
  }
  getUser();

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
      <PageBreadcrumb pageTitle="Usuarios" />

      <div className="space-y-6">
        <ComponentCard title="Usuarios">
          <CreateUserModal users={users} isOpen={createUserModalOpen} recarga={recarga} setRecarga={setRecarga} onClose={() => setCreateUserModalOpen(false)} />
          <div className="flex justify-between items-center mb-4">
            <SearchComponent users={users} setUsers={setUsers} />
            <Button
              onClick={() => setCreateUserModalOpen(true)}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Crear Usuario
            </Button>
          </div>
          <TableUsers users={users} recarga={recarga} setRecarga={setRecarga} />
        </ComponentCard>
      </div>
    </div>
    </VerificadorSesion>
  )
}
