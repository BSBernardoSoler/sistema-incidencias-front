"use client";
import React, { useState, useEffect } from 'react';
import Label from '../../../../components/form/Label';
import Input from '../../../../components/form/input/InputField';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import Button from '@/components/ui/button/Button';
import { Registro } from '@/types/interfaces';

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

interface CreateCambioModalProps {
  isOpen: boolean;
  onClose: () => void;
  recarga: boolean;
  setRecarga: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Option {
  value: string | number;
  label: string;
  registro: Registro;
}

export default function CreateCambioModal({
  isOpen,
  onClose,
  recarga,
  setRecarga,
}: CreateCambioModalProps) {
  const [registro, setRegistro] = useState<Registro | null>(null);
  const [campoModificado, setCampoModificado] = useState('');
  const [valorAnterior, setValorAnterior] = useState('');
  const [valorNuevo, setValorNuevo] = useState('');

  const loadOptions = async (inputValue: string) => {
    return await handleBuscarRegistro(inputValue);
  };

  const handleBuscarRegistro = async (documento: string) => {
    if (isNaN(Number(documento))) {
      toast.error('El ID del registro debe ser un número');
      return [];
    }
    if (documento.length >= 1) {
      try {
        const response = await fetch(
          `/api/registros/show?id=${documento}`,
          { method: "GET" }
        );
        const data = await response.json();

        if (response.status === 200 && data) {
          const registro: Registro = data;
          return [
            {
              value: registro.id,
              label: `Lote${registro.lote} ${registro.id} Estado:${registro.estado_validacion} Fecha:${registro.fecha_digitacion}`,
              registro,
            },
          ];
        } else {
          toast.error(data.message || 'No se encontró el registro');
          return [];
        }
      } catch (error) {
        console.error("Error al buscar registro:", error);
        return [];
      }
    }
    return [];
  };

  const handleChangeRegistro = (selectedOption: any) => {
    if (selectedOption) {
      setRegistro(selectedOption.registro);
    } else {
      setRegistro(null);
    }
  };

  const createCambio = async () => {
    const camposFaltantes: string[] = [];
    if (!registro) camposFaltantes.push('Registro');
    if (!campoModificado) camposFaltantes.push('Campo modificado');
    if (!valorAnterior) camposFaltantes.push('Valor anterior');
    if (!valorNuevo) camposFaltantes.push('Valor nuevo');

    if (camposFaltantes.length > 0) {
      toast.error(`Faltan los siguientes campos obligatorios: ${camposFaltantes.join(', ')}`);
      return;
    }

    const cambioData = {
      registro_id: Number(registro?.id),
      campo_modificado: campoModificado,
      valor_anterior: valorAnterior,
      valor_nuevo: valorNuevo,
      fecha_modificacion: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/historial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cambioData),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || 'Error al crear cambio');
        return;
      }
      toast.success('Cambio creado correctamente');
      setRecarga(!recarga);
      setRegistro(null);
      setCampoModificado('');
      setValorAnterior('');
      setValorNuevo('');
      onClose();
    } catch (error) {
      toast.error('Error al crear cambio');
      console.error('Error al crear cambio:', error);
    }
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
          <h2 className="text-xl font-semibold">Crear Cambio</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Registro</Label>
              <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                onChange={handleChangeRegistro}
                placeholder="Ingrese el ID del registro"
                isClearable
                className="flex-grow w-full"
                value={registro ? {
                  value: registro.id,
                  label: `Lote ${registro.lote} - ID: ${registro.id} - Estado: ${registro.estado_validacion} - Fecha: ${registro.fecha_digitacion}`,
                  registro: registro,
                } : null}
              />
            </div>
            <div className="col-span-2">
              <Label>Campo modificado</Label>
              <Input
                type="text"
                className="py-1.5 text-sm"
                value={campoModificado}
                onChange={(e) => setCampoModificado(e.target.value)}
                placeholder="Campo modificado"
              />
            </div>
            <div>
              <Label>Valor anterior</Label>
              <Input
                type="text"
                className="py-1.5 text-sm"
                value={valorAnterior}
                onChange={(e) => setValorAnterior(e.target.value)}
                placeholder="Valor anterior"
              />
            </div>
            <div>
              <Label>Valor nuevo</Label>
              <Input
                type="text"
                className="py-1.5 text-sm"
                value={valorNuevo}
                onChange={(e) => setValorNuevo(e.target.value)}
                placeholder="Valor nuevo"
              />
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
              onClick={createCambio}
            >
              Crear Cambio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
