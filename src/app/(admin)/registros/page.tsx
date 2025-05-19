import VerificadorSesion from '@/components/provider/verificadorSesion'
import React from 'react'

export default function Registros() {
  return (
    <VerificadorSesion rolesPermitidos={['admin']}>
      <div>Registros</div>
    </VerificadorSesion>
  )
}
