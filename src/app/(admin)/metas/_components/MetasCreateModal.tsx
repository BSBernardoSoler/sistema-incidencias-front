"use client";
import React, { useState, useEffect } from 'react';
import Label from '../../../../components/form/Label';
import Input from '../../../../components/form/input/InputField';
import Select from '../../../../components/form/Select';
import { ChevronDownIcon, EyeCloseIcon, EyeIcon } from '../../../../icons';
import { Meta, User, Usuario } from '@/types/interfaces';
import toast from 'react-hot-toast';
import Button from '@/components/ui/button/Button';
import AsyncSelect from 'react-select/async';

interface CreateMetasModalProps {
  metas: Meta[];
  isOpen: boolean;
  onClose: () => void;
  recarga: boolean;
  setRecarga: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Option {
  value: string;
  label: string;
}

export default function CreateMetasModal({
  metas,
  isOpen,
  onClose,
  recarga,
  setRecarga,
}: CreateMetasModalProps) {
  const [mes, setMes] = useState('');
  const [meta_diaria, setMetaDiaria] = useState('');
  const [meta_mensual, setMetaMensual] = useState('');
  const [showPassword, setShowPassword] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  


    // Función para cargar opciones  de clientes
  const loadOptions = async (inputValue: string) => {
    return await handleBuscarUsuario(inputValue);
  };


      // Función para buscar usuario por documento
    const handleBuscarUsuario = async (documento: string) => {
      if (documento.length >= 8 && documento.length <= 11) {
        try {
          const response = await fetch(
            `/api/usuarios/show?dni=${documento}`,
            {
              method: "GET",
            }
          );
          const data = await response.json();
  
            if (response.status === 200 && data && data.length > 0) {
            const usuarios: Usuario[] = data;
            return usuarios.map((usuario) => ({
              value: usuario.id,
              label: `${usuario.nombres} ${usuario.apellidos} Doc:${usuario.dni}`,
              usuario, // Agregamos el objeto completo para referencia
            }));
            } else {
            console.error(data.message);
            //toast.error(data.mensaje);
            return []; // Si no hay usuario, retorna un array vacío
          }
        } catch (error) {
          //console.error("Error al buscar usuario:", error);
          return []; // Manejo de errores
        }
      }
      return []; // Retorna vacío si el documento no cumple con la longitud
    };
    // Manejar el cambio de selección de usuario
  const handleChange = (selectedOption: any) => {
    if (selectedOption) {

      setSelectedUsuario(selectedOption.usuario);

      console.log("Usuario seleccionado:", selectedOption.usuario);
    } else {
      setSelectedUsuario(null); // Limpia la selección
    }
  };


  const options: Option[] = [
    { value: '01', label: 'enero' },
    { value: '02', label: 'febrero' },
    { value: '03', label: 'marzo' },
    { value: '04', label: 'abril' },
    { value: '05', label: 'mayo' },
    { value: '06', label: 'junio' },
    { value: '07', label: 'julio' },
    { value: '08', label: 'agosto' },
    { value: '09', label: 'septiembre' },
    { value: '10', label: 'octubre' },
    { value: '11', label: 'noviembre' },
    { value: '12', label: 'diciembre' },
  ];

  const createMeta = async () => {
    if (
      !mes.trim() ||
      !meta_diaria.trim() ||
      !meta_mensual.trim()
    ) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    const userData = {
      usuario_id: selectedUsuario?.id,
      mes: mes,
      meta_diaria: Number(meta_diaria),
      meta_mensual: Number(meta_mensual),
      estado: 1,
    };

    try {
      const response = await fetch('/api/metas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
 

      if (response.status !== 200) {
        const data = await response.json();
        toast.error(data.message || 'Error al crear meta');
        return

      }


      if(response.status === 200) {
        toast.success('Meta creada correctamente');
      setRecarga(!recarga);
      setMes('');
      setMetaDiaria('');
      setMetaMensual('');
      onClose();
      }
    } catch (error) {
      toast.error('Error al crear meta');
      console.error('Error al crear meta:', error);
    }
  };

  const handleSelectChange = (value: string) => {
    const selected = options.find((option) => option.value === value) || null;
    setMes(selected?.value || '');
  };

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
          <h2 className="text-xl font-semibold">Crear Meta</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
             <div className="mt-1">
              <label
                htmlFor="invoice_entity_id"
                className="block text-sm font-medium text-gray-700"
              >
                Usuario
              </label>
              <div className="relative mt-1 flex items-center space-x-2">
                <AsyncSelect
                  cacheOptions
                  loadOptions={loadOptions}
                  onChange={handleChange}
                  placeholder="Buscar cliente por documento..."
                  isClearable
                  className="flex-grow"
                  value={
                    selectedUsuario
                      ? {
                          value: selectedUsuario?.id,
                          label: `${selectedUsuario?.nombres} ${selectedUsuario?.apellidos}`,
                          usuario: selectedUsuario, // Agregamos el objeto completo para referencia
                        }
                      : ""
                  }
                />
           
              </div>
            </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Meta Diaria </Label>
              <Input
                type="text"
                placeholder="Ingrese meta diaria"
                className="py-1.5 text-sm"
                value={meta_diaria}
                onChange={(e) => setMetaDiaria(e.target.value)}
              />
            </div>
            <div>
              <Label>Meta Quincenal</Label>
              <Input
                type="text"
                placeholder="Ingrese meta mensual"
                className="py-1.5 text-sm"
                value={meta_mensual}
                onChange={(e) => setMetaMensual(e.target.value)}
              />
            </div>
       
            <div>
              <Label>Mes</Label>
              <div className="relative">
                <Select
                  options={options}
                  placeholder="Seleccione un mes"
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900 text-sm"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
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
              onClick={createMeta}
            >
              Crear Meta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
