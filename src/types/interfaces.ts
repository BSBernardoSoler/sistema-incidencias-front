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
