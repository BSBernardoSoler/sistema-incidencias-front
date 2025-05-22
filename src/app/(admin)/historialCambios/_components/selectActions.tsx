"use client";
import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@/icons";
import toast from "react-hot-toast";

interface SelectActionsProps {
  historialId: number;
  recarga: boolean;
  setRecarga: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
}

export default function SelectActions({
  historialId,
  recarga,
  setRecarga,
  isActive,
}: SelectActionsProps) {
  const handleAction = async (action: string) => {
    if (action === "Eliminar") {
      if (!isActive) {
        toast.error("No se puede eliminar un usuario inactivo");
      } else {
        await deleteUser(historialId);
      }
    } else if (action === "Editar") {
      // Handle edit action here
      console.log("Edit user with ID:", historialId);
    }
  };

  const deleteUser = async (historialId: number) => {
    const res = await fetch(`/api/historial?id=${historialId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json();
      toast.error(errorData.message || "Error deleting user");
      return;
    } else {
      toast.success("User deleted successfully");
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
