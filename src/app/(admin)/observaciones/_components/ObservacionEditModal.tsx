"use client";
import React, { useState, useEffect } from 'react';
import Label from '../../../../components/form/Label';
import Input from '../../../../components/form/input/InputField';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import Button from '@/components/ui/button/Button';
import { Registro, Observacion } from '@/types/interfaces';

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

interface ObservacionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  recarga: boolean;
  setRecarga: React.Dispatch<React.SetStateAction<boolean>>;
  observacion: Observacion | null; // Observación a editar
}

interface Option {
  value: string | number;
  label: string;
  registro: Registro;
}

export default function ObservacionEditModal({
  isOpen,
  onClose,
  recarga,
  setRecarga,
  observacion,
}: ObservacionEditModalProps) {
  const [registroReporta, setRegistroReporta] = useState<Registro | null>(null);
  const [detalleObservacion, setDetalleObservacion] = useState('')
  const [respuestaDigitador, setRespuestaDigitador] = useState('');
  const [estadoValidacion, setEstadoValidacion] = useState(0);

  // Cargar datos iniciales cuando se abre el modal y hay observación
  useEffect(() => {
    if (isOpen && observacion) {
      setDetalleObservacion(observacion.detalle_observacion || '');
      setRespuestaDigitador(observacion.respuesta_digitador || '');
      setEstadoValidacion(observacion.estado || 0);
      setRegistroReporta(observacion.registro || null);
      // Cargar el registro asociado a la observación
  
    } else if (!isOpen) {
      setRegistroReporta(null);
      setDetalleObservacion('');
      setRespuestaDigitador('');
    }
  }, [isOpen, observacion]);

  // Función para cargar opciones de registros
  const loadOptions = async (inputValue: string) => {
    return await handleBuscarRegistro(inputValue);
  };

  // Función para buscar registro por documento
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

  // Manejar el cambio de selección de registro
  const handleChangeRegistro = (selectedOption: any) => {
    if (selectedOption) {
      setRegistroReporta(selectedOption.registro);
    } else {
      setRegistroReporta(null);
    }
  };

  // Editar observación
  const editObservacion = async () => {
    if (!observacion) return;
    const camposFaltantes: string[] = [];
    if (!registroReporta) camposFaltantes.push('Registro reportado');
    if (!detalleObservacion) camposFaltantes.push('Detalle de observación');

    if (camposFaltantes.length > 0) {
      toast.error(`Faltan los siguientes campos obligatorios: ${camposFaltantes.join(', ')}`);
      return;
    }
    let observacionData={}

   if(respuestaDigitador !== ''){
     observacionData = {
      id: Number(observacion.id),
      estado: estadoValidacion,
      registro_id: Number(registroReporta?.id),
      detalle_observacion: detalleObservacion,
      respuesta_digitador: respuestaDigitador || undefined,
      fecha_respuesta: new Date().toISOString(), // Actualizamos la fecha de respuesta

      // No actualizamos fecha_observacion aquí
    };
   }else{
       observacionData = {
      id: Number(observacion.id),
      estado: estadoValidacion,
      registro_id: Number(registroReporta?.id),
      detalle_observacion: detalleObservacion,
      respuesta_digitador: respuestaDigitador || undefined,

      // No actualizamos fecha_observacion aquí
    };
   }

    try {
      const response = await fetch(`/api/observaciones`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(observacionData),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || 'Error al editar observación');
        return;
      }
      toast.success('Observación editada correctamente');
      setRecarga(!recarga);
      setRegistroReporta(null);
      setDetalleObservacion('');
      setRespuestaDigitador('');
      onClose();
    } catch (error) {
      toast.error('Error al editar observación');
      console.error('Error al editar observación:', error);
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
          <h2 className="text-xl font-semibold">Editar Observación</h2>
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
               <Input
                type="text"
                className="py-1.5 text-sm"
                value={registroReporta ? `Lote ${registroReporta.lote} ID ${registroReporta.id} Estado: ${registroReporta.estado_validacion} Fecha: ${registroReporta.fecha_digitacion}` : ''}
                 disabled
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
            <div className="col-span-2">
              <Label>Respuesta digitador</Label>
              <Input
                type="text"
                className="py-1.5 text-sm"
                value={respuestaDigitador}
                onChange={(e) => setRespuestaDigitador(e.target.value)}
                placeholder="Respuesta del digitador"
              />
            </div>
                <div className="col-span-2">
                  <Label>Estado de validación</Label>
                  <select
                    className="py-1.5 text-sm w-full border rounded-md dark:bg-dark-800 dark:text-white"
                    value={estadoValidacion}
                    onChange={(e) => setEstadoValidacion(Number(e.target.value))}
                  >
                    <option value={"1"}>Pendiente</option>
                    <option value={"2"}>En proceso</option>
                    <option value={"3"}>Resuelto</option>
                  </select>
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
              onClick={editObservacion}
            >
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
