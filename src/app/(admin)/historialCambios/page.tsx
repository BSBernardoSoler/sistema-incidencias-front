import VerificadorSesion from '@/components/provider/verificadorSesion'
import React from 'react'

export default function Historial() {
  return (
     <VerificadorSesion rolesPermitidos={['admin']}>
      <div>Historial</div>
    </VerificadorSesion>
  )
}
