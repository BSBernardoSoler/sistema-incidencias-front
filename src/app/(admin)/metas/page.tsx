import VerificadorSesion from '@/components/provider/verificadorSesion'
import React from 'react'

export default function Metas() {
  return (
    <VerificadorSesion rolesPermitidos={['admin']}>
      <div>Metas</div>
    </VerificadorSesion>
  )
}
