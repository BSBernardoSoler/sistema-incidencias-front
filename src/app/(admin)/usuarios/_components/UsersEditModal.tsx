"use client";
import React, { useState, useEffect } from 'react';
import Label from '../../../../components/form/Label';
import Input from '../../../../components/form/input/InputField';
import Select from '../../../../components/form/Select';
import { ChevronDownIcon, EyeCloseIcon, EyeIcon } from '../../../../icons';
import { User } from '@/types/interfaces';
import toast from 'react-hot-toast';
import Button from '@/components/ui/button/Button';
import { se } from 'date-fns/locale';

interface CreateUserModalProps {
  userEdit: User | null;
  isOpen: boolean;
  onClose: () => void;
  recarga: boolean;
  setRecarga: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Option {
  value: string;
  label: string;
}

export default function EditUserModal({
  userEdit,
  isOpen,
  onClose,
  recarga,
  setRecarga,
}: CreateUserModalProps) {
 const [firstName, setFirstName] = useState(userEdit ? userEdit.nombres : '');
   const [lastName, setLastName] = useState(userEdit ? userEdit.apellidos : '');
   const [dni, setDni] = useState(userEdit ? userEdit.dni : '');
   const [email, setEmail] = useState(userEdit ? userEdit.correo : '');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [selectedRole, setSelectedRole] = useState<Option | null>(null);
   const [telefono, setTelefono] = useState(userEdit ? userEdit.telefono : '');
    const [condicionLaboral, setCondicionLaboral] = useState<string>(
      userEdit ? userEdit.condicionLaboral || '' : ''
    );
   const options: Option[] = [
     { value: '1', label: 'digitador' },
     { value: '2', label: 'admin' },
     { value: '3', label: 'doctor' },
   ];
 

  const createUser = async () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !dni.trim() ||
      !email.trim() 
    ) {
      toast.error('Todos los campos son obligatorios');
      return;
    }
    let userData={

    }

   if(password){
       userData = {
      nombres: firstName,
      apellidos: lastName,
      condicionLaboral,
      dni,
      correo: email,
      telefono,
      estado: 1,
      password,
      rol_id: Number(selectedRole?.value),
    };
   }else{
       userData = {
      nombres: firstName,
      apellidos: lastName,
      condicionLaboral,
      dni,
      correo: email,
      telefono,
      estado: 1,
      rol_id: Number(selectedRole?.value),
    };
   }

    try {
      const response = await fetch(`/api/usuarios?id=${userEdit?.id }`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || 'Error al actualizar usuario');

        
      }
     if (response.status === 200) {
       toast.success('Usuario actualizado correctamente');
      setRecarga(!recarga);
      setFirstName('');
      setLastName('');
      setDni('');
      setEmail('');
      setPassword('');
      setSelectedRole(null);
      onClose();
     }
    } catch (error) {
      toast.error('Error al actualizar usuario');
      console.error('Error al actualizar usuario:', error);
    }
  };

  const handleSelectChange = (value: string) => {
    const selected = options.find((option) => option.value === value) || null;
    setSelectedRole(selected);
  };

  useEffect(() => {
    if (userEdit) {
      setFirstName(userEdit.nombres);
      setLastName(userEdit.apellidos);
      setDni(userEdit.dni);
      setEmail(userEdit.correo);
      setTelefono(userEdit.telefono || '');
      setCondicionLaboral(userEdit.condicionLaboral || '');
      setSelectedRole({
        value: String(userEdit.rol.id),
        label: userEdit.rol.nombre,
      });
    }
  }, [userEdit]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg dark:bg-dark-900 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Editar Usuario</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nombres</Label>
              <Input
                type="text"
                placeholder="Ingrese nombres"
                className="py-1.5 text-sm"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <Label>Apellidos</Label>
              <Input
                type="text"
                placeholder="Ingrese apellidos"
                className="py-1.5 text-sm"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <Label>DNI</Label>
              <Input
                type="text"
                placeholder="Ingrese DNI"
                className="py-1.5 text-sm"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
              />
            </div>
            <div>
              <Label>Condicion laboral</Label>
              <Input
                type="text"
                placeholder="Ingrese condicion laboral"
                className="py-1.5 text-sm"
                value={condicionLaboral}
                onChange={(e) => setCondicionLaboral(e.target.value)}
              />
            </div>
            <div>
              <Label>Rol</Label>
              <div className="relative">
                <Select
                  options={options}
                  placeholder="Seleccione un rol"
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900 text-sm"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Ingrese email"
                className="py-1.5 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label>Telefono</Label>
              <Input
                type="text"
                placeholder="Ingrese telefono"
                className="py-1.5 text-sm"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            <div>
              <Label>Contraseña</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ingrese contraseña"
                  className="py-1.5 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={onClose}
              className="px-4 py-1.5 text-sm border border-gray-300 rounded-md dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancelar
            </Button>
            <Button
              className="px-4 py-1.5 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={createUser}
            >
              Guardar Usuario
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
