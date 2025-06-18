"use client";
import React, { useState, useEffect } from 'react';
import Label from '../../../../components/form/Label';
import Input from '../../../../components/form/input/InputField';
import Select from '../../../../components/form/Select';
import { ChevronDownIcon } from '../../../../icons';
import { Meta } from '@/types/interfaces';
import toast from 'react-hot-toast';
import Button from '@/components/ui/button/Button';

interface MetasEditModalProps {
  meta: Meta | null;
  isOpen: boolean;
  onClose: () => void;
  recarga: boolean;
  setRecarga: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Option {
  value: string;
  label: string;
}

export default function MetasEditModal({
  meta,
  isOpen,
  onClose,
  recarga,
  setRecarga,
}: MetasEditModalProps) {
  const [mes, setMes] = useState('');
  const [meta_diaria, setMetaDiaria] = useState('');
  const [meta_mensual, setMetaMensual] = useState('');

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

  useEffect(() => {
    if (meta && isOpen) {
      setMes(meta.mes || '');
      setMetaDiaria(meta.meta_diaria?.toString() || '');
      setMetaMensual(meta.meta_mensual?.toString() || '');
    }
    if (!isOpen) {
      setMes('');
      setMetaDiaria('');
      setMetaMensual('');
    }
  }, [meta, isOpen]);

  const updateMeta = async () => {
    if (
      !mes.trim() ||
      !meta_diaria.trim() ||
      !meta_mensual.trim()
    ) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    if (!meta) {
      toast.error('No hay meta seleccionada');
      return;
    }

    const metaData = {
      id: meta.id,
      mes,
      meta_diaria: Number(meta_diaria),
      meta_mensual: Number(meta_mensual),
      estado: meta.estado,
    };

    try {
      const response = await fetch(`/api/metas/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metaData),
      });

      if (response.status !== 200) {
        const data = await response.json();
        toast.error(data.message || 'Error al actualizar meta');
        return;
      }

      toast.success('Meta actualizada correctamente');
      setRecarga(!recarga);
      onClose();
    } catch (error) {
      toast.error('Error al actualizar meta');
      console.error('Error al actualizar meta:', error);
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

  if (!isOpen || !meta) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg dark:bg-dark-900 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Editar Meta</h2>
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
              <Label>Meta Mensual</Label>
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
                  defaultValue={options.find(option => option.value === mes)?.value || ''}
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
              onClick={updateMeta}
            >
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
