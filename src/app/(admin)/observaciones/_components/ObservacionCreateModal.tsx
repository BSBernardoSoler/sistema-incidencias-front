"use client";
import React, { useState, useEffect } from 'react';
import Label from '../../../../components/form/Label';
import Input from '../../../../components/form/input/InputField';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import Button from '@/components/ui/button/Button';
import { Registro, User, Usuario } from '@/types/interfaces';

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

interface CreateObservacionModalProps {
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

export default function CreateObservacionModal({
  isOpen,
  onClose,
  recarga,
  setRecarga,
}: CreateObservacionModalProps) {
  const [registroReporta, setRegistroReporta] = useState<Registro| null>(null);
  const [detalleObservacion, setDetalleObservacion] = useState('');
  const [respuestaDigitador, setRespuestaDigitador] = useState('');


   // Función para cargar opciones  de clientes
  const loadOptions = async (inputValue: string) => {
    return await handleBuscarRegistro(inputValue);
  };



    // Función para buscar usuario por documento
  const handleBuscarRegistro = async (documento: string) => {
    if (isNaN(Number(documento))) {
      toast.error('El ID del registro debe ser un número');
      return [];
    }
    if (documento.length >= 1) {
      try {
        const response = await fetch(
          `/api/registros/show?id=${documento}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();

        if (response.status === 200 && data ) {
          const registro :Registro= data; // Suponiendo que solo hay un registro por documento
          return [
            {
              value: registro.id,
              label: `Lote${registro.lote} ${registro.id} Estado:${registro.estado_validacion} Fecha:${registro.fecha_digitacion}`,
              registro, // Agregamos el objeto completo para referencia
            },
          ];
        } else {
          toast.error(data.message || 'No se encontró el registro');
          return []; // Si no hay usuario, retorna un array vacío
        }
      } catch (error) {
        console.error("Error al buscar usuario:", error);
        return []; // Manejo de errores
      }
    }
    return []; // Retorna vacío si el documento no cumple con la longitud
  };


  // Manejar el cambio de selección de registro
  const handleChangeRegistro = (selectedOption: any) => {
    if (selectedOption) {

      setRegistroReporta(selectedOption.registro);

      console.log("Registro seleccionado:", selectedOption.registro);
    } else {
      setRegistroReporta(null); // Limpia la selección
    }
  };
  const createObservacion = async () => {
    const camposFaltantes: string[] = [];
    if (!registroReporta) camposFaltantes.push('Registro reportado');
    if (!detalleObservacion) camposFaltantes.push('Detalle de observación');

    if (camposFaltantes.length > 0) {
      toast.error(`Faltan los siguientes campos obligatorios: ${camposFaltantes.join(', ')}`);
      return;
    }

    const observacionData = {
      registro_id: Number(registroReporta?.id),
      detalle_observacion: detalleObservacion,
      respuesta_digitador: respuestaDigitador || undefined,
      fecha_observacion: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/observaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(observacionData),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || 'Error al crear observación');
        return;
      }
      toast.success('Observación creada correctamente');
      setRecarga(!recarga);
      setRegistroReporta(null);
      setDetalleObservacion('');
      setRespuestaDigitador('');
      onClose();
    } catch (error) {
      toast.error('Error al crear observación');
      console.error('Error al crear observación:', error);
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
          <h2 className="text-xl font-semibold">Crear Observación</h2>
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
              <Label>Registro reportado</Label>
              <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                onChange={handleChangeRegistro}
                placeholder="Ingrese el ID del registro"
                isClearable
                className="flex-grow w-full"
                value={registroReporta ? {
                  value: registroReporta.id,
                  label: `Lote ${registroReporta.lote} - ID: ${registroReporta.id} - Estado: ${registroReporta.estado_validacion} - Fecha: ${registroReporta.fecha_digitacion}`,
                  registro: registroReporta,
                } : null}
              />
            </div>
            <div className="col-span-2">
              <Label>Detalle de observación</Label>
              <Input
                type="text"
                className="py-1.5 text-sm"
                value={detalleObservacion}
                onChange={(e) => setDetalleObservacion(e.target.value)}
                placeholder="Detalle de la observación"
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
              onClick={createObservacion}
            >
              Crear Observación
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
