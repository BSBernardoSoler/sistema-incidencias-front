import { Observacion, User } from '@/types/interfaces'
import React from 'react'

interface SearchComponentProps {
  observaciones: Observacion[]
  setObservaciones: React.Dispatch<React.SetStateAction<Observacion[]>>
}

export default function SearchComponent({ observaciones, setObservaciones }: SearchComponentProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [originalObservaciones] = React.useState<Observacion[]>(observaciones);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();
    if (!value) {
      setObservaciones(originalObservaciones);
      return;
    }
    setObservaciones(
      originalObservaciones.filter(
        (observacion) =>
          observacion.detalle_observacion.toLowerCase().includes(value) ||
          observacion.usuarioReporta.nombres.toLowerCase().includes(value) ||
          observacion.usuarioReporta.apellidos.toLowerCase().includes(value) ||
          observacion.usuarioReporta.dni.toLowerCase().includes(value) ||
          observacion.usuarioReporta.correo.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="hidden lg:block">
      <form>
        <div className="relative ">
          <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
            {/* SVG icon */}
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search or type command..."
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
            onChange={handleSearch}
          />
        </div>
      </form>
    </div>
  )
}
