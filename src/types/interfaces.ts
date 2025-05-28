export interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
  estado: number;
}

export interface User {
  id: number;
  nombres: string;
  apellidos: string;
  dni: string;
  correo: string;
  telefono?: string;
  estado: number;
  fecha_ingreso: string; // o Date, si vas a parsearla
  rol: Rol;
}



export interface Registro {
  id: number;
  fecha_digitacion: string; // o Date, si vas a parsearla
  cantidad_registros: number;
  hora_inicio: string;
  hora_fin: string;
  estado_validacion: string;
  observaciones: string;
  estado: number;
}

export interface Alerta {
  id: number;
  registro: Registro;
  tipo_alerta: string;
  descripcion: string;
  fecha_generada: string; // o Date, si vas a parsearla
  resuelta: boolean;
  estado: number;
}

export interface Historial {
  id: number;
  registro: Registro;
  usuarioModifica: Omit<User, 'rol'>;
  campo_modificado: string;
  valor_anterior: string;
  valor_nuevo: string;
  fecha_modificacion: string; // o Date, si vas a parsearla
  estado: number;
}

export interface Meta {
  id: number;
  mes: string;
  meta_diaria: number;
  meta_mensual: number;
  fecha_registro: string; // o Date, si vas a parsearla
  estado: number;
}


export interface Observacion {
  id: number;
  registro: Registro;
  usuarioReporta: Omit<User, 'rol'>;
  detalle_observacion: string;
  estado: number;
  respuesta_digitador: string;
  fecha_observacion: string; // o Date, si vas a parsearla
  fecha_respuesta: string; // o Date, si vas a parsearla
}

export interface RegistroDetalle {
  id: number;
  usuario: Omit<User, 'rol'>;
  fecha_digitacion: string;
  cantidad_registros: number;
  hora_inicio: string;
  hora_fin: string;
  estado_validacion: string;
  observaciones: string;
  estado: number;
  observacionesList: Array<Omit<Observacion, 'registro' | 'usuarioReporta'>>;
  cambios: Array<Omit<Historial, 'registro' | 'usuarioModifica'>>;
  alertas: Array<Omit<Alerta, 'registro'>>;
}



