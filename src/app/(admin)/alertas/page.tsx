import VerificadorSesion from '@/components/provider/verificadorSesion'
import React from 'react'

export default function Alertas() {
  return (
    <VerificadorSesion rolesPermitidos={['admin']}>
      <div>Alertas</div>
    </VerificadorSesion>
  )
}
