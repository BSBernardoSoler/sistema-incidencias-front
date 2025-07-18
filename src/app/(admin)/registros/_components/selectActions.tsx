"use client";
import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@/icons";
import toast from "react-hot-toast";
import { RegistroDetalle } from "@/types/interfaces";

interface SelectActionsProps {
  registroId: number;
  recarga: boolean;
  registro: RegistroDetalle | null;
  setRecarga: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
  setEditRegistroModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRegistro?: React.Dispatch<React.SetStateAction<RegistroDetalle | null>>;
}

export default function SelectActions({
  registroId,
  recarga,
  setRecarga,
  isActive,
  registro,
  setEditRegistroModalOpen,
  setSelectedRegistro,
}: SelectActionsProps) {
  const handleAction = async (action: string) => {
    if (action === "Eliminar") {
      if (!isActive) {
        toast.error("No se puede eliminar un registro inactivo");
      } else {
        await deleteUser(registroId);
      }
    } else if (action === "Editar") {
      setEditRegistroModalOpen?.(true);
      setSelectedRegistro?.(registro);
    }
  };

  const deleteUser = async (registroId: number) => {
    const res = await fetch(`/api/registros?id=${registroId}`, {
      method: "DELETE",
    });
      const errorData = await res.json();

    if (!res.ok) {
      toast.error(errorData.message || "Error al eliminar registro");
      return;
    } else {
      toast.success(errorData.message || "Registro eliminado correctamente");
      setRecarga(!recarga);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium bg-white dark:bg-dark-900 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-dark-800 focus:outline-none">
        Acciones
        <ChevronDownIcon className="ml-2 w-5 h-5" />
      </MenuButton>
      <MenuItems className="absolute right-0 z-10 mt-2 w-36 origin-top-right bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-md shadow-lg focus:outline-none">
        <div className="py-1">
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => handleAction("Editar")}
                className={`${
                  active ? "bg-gray-100 dark:bg-dark-800" : ""
                } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
              >
                Editar
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => handleAction("Eliminar")}
                className={`${
                  active ? "bg-gray-100 dark:bg-dark-800" : ""
                } block w-full text-left px-4 py-2 text-sm text-red-600`}
              >
                Eliminar
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
