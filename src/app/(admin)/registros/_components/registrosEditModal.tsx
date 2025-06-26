"use client";
import React, { useState, useEffect } from 'react';
import Label from '../../../../components/form/Label';
import Input from '../../../../components/form/input/InputField';
import Select from '../../../../components/form/Select';
import { ChevronDownIcon } from '../../../../icons';
import { User, Usuario, Registro, RegistroDetalle } from '@/types/interfaces';
import toast from 'react-hot-toast';
import Button from '@/components/ui/button/Button';
import dynamic from 'next/dynamic';
const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

interface EditRegistroModalProps {
  users: User[];
  isOpen: boolean;
  onClose: () => void;
  recarga: boolean;
  setRecarga: React.Dispatch<React.SetStateAction<boolean>>;
  registro: RegistroDetalle | null; // El registro a editar
}

interface Option {
  value: string;
  label: string;
  usuario?: Usuario;
}

export default function EditRegistroModal({
  users,
  isOpen,
  onClose,
  recarga,
  setRecarga,
  registro,
}: EditRegistroModalProps) {
  const [usuarioId, setUsuarioId] = useState<Option | null>(null);
  const [fechaDigitacion, setFechaDigitacion] = useState('');
  const [cantidadRegistros, setCantidadRegistros] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [estadoValidacion, setEstadoValidacion] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [lote, setLote] = useState('');

  // Inicializar los campos cuando cambia el registro
  useEffect(() => {
    if (registro) {
      setFechaDigitacion(registro.fecha_digitacion || '');
      setCantidadRegistros(registro.cantidad_registros?.toString() || '');
      setHoraInicio(registro.hora_inicio || '');
      setHoraFin(registro.hora_fin || '');
      setEstadoValidacion(registro.estado_validacion || '');
      setObservaciones(registro.observaciones || '');
      setLote(registro.lote || '');
    } else {
      setFechaDigitacion('');
      setCantidadRegistros('');
      setHoraInicio('');
      setHoraFin('');
      setEstadoValidacion('');
      setObservaciones('');
      setLote('');
    }
  }, [registro]);

  const userOptions: Option[] = users.map((u) => ({
    value: u.id.toString(),
    label: `${u.nombres} ${u.apellidos}`,
  }));

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
          const usuario = usuarios[0];
          return [
            {
              value: usuario.id,
              label: `${usuario.nombres} ${usuario.apellidos} Doc:${usuario.dni}`,
              usuario,
            },
          ];
        } else {
          return [];
        }
      } catch (error) {
        return [];
      }
    }
    return [];
  };



  const updateRegistro = async () => {
    if (!registro) return;
    const camposFaltantes: string[] = [];
    if (!fechaDigitacion) camposFaltantes.push('Fecha de digitación');
    if (!cantidadRegistros) camposFaltantes.push('Cantidad de registros');
    if (!horaInicio.trim()) camposFaltantes.push('Hora de inicio');
    if (!horaFin.trim()) camposFaltantes.push('Hora de fin');
    if (!lote.trim()) camposFaltantes.push('Lote');

    if (camposFaltantes.length > 0) {
      toast.error(`Faltan los siguientes campos obligatorios: ${camposFaltantes.join(', ')}`);
      return;
    }

    const registroData = {
      id: registro.id,
      fecha_digitacion: fechaDigitacion,
      cantidad_registros: Number(cantidadRegistros),
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      estado_validacion: 'Validado',
      lote: lote,
      observaciones: observaciones || undefined,
    };

    try {
      const response = await fetch(`/api/registros`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registroData),
      });
      const data = await response.json();
      if (!response.ok) toast.error(data.message || 'Error al actualizar registro');

      if (response.status === 200) {
        toast.success('Registro actualizado correctamente');
        setRecarga(!recarga);
        onClose();
      }
    } catch (error) {
      toast.error('Error al actualizar registro');
      console.error('Error al actualizar registro:', error);
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
          <h2 className="text-xl font-semibold">Editar Registro</h2>
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
              <Label>Fecha de digitación</Label>
              <Input
                type="date"
                className="py-1.5 text-sm"
                value={fechaDigitacion}
                onChange={(e) => setFechaDigitacion(e.target.value)}
              />
            </div>
            <div>
              <Label>Cantidad de registros</Label>
              <Input
                type="number"
                className="py-1.5 text-sm"
                value={cantidadRegistros}
                onChange={(e) => setCantidadRegistros(e.target.value)}
              />
            </div>
            <div>
              <Label>Lote</Label>
              <Input
                type="text"
                placeholder="Ingrese lote"
                className="py-1.5 text-sm"
                value={lote}
                onChange={(e) => setLote(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Hora inicio</Label>
              <Input
                type="time"
                className="py-1.5 text-sm"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
              />
            </div>
            <div>
              <Label>Hora fin</Label>
              <Input
                type="time"
                className="py-1.5 text-sm"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Observaciones (opcional)</Label>
            <Input
              type="text"
              placeholder="Ingrese observaciones"
              className="py-1.5 text-sm"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
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
              onClick={updateRegistro}
            >
              Actualizar Registro
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
