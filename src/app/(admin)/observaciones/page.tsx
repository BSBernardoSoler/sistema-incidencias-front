import VerificadorSesion from '@/components/provider/verificadorSesion'
import React from 'react'

export default function Observaciones() {
  return (
    <VerificadorSesion rolesPermitidos={['admin']}>
      <div>Observaciones</div>
    </VerificadorSesion>
  )
}
