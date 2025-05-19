import { envs } from "@/config/envs";
import { fetchWithAuth } from "@/utils/fetchFunction";

const API_URL = process.env.NEXT_PUBLIC_BACKEND ;


  export const getUsuarios = async () => {
    try {
      const res = await fetchWithAuth(`${API_URL}/usuarios`,{
        method: 'GET'
      
      });
      if (!res.ok) throw new Error('Error al obtener usuarios');
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Respuesta inválida de usuarios');
      return data;
    } catch (error) {
      throw new Error(`getUsuarios: ${(error as Error).message}`);
    }
  }
  export const getUsuarioById = async (id: string) => {
    try {
      if (!id) throw new Error('ID de usuario requerido');
      const res = await fetchWithAuth(`${API_URL}/usuarios/${id}`);
      if (!res.ok) throw new Error('Error al obtener usuario');
      const data = await res.json();
      if (!data || typeof data !== 'object') throw new Error('Respuesta inválida de usuario');
      return data;
    } catch (error) {
      throw new Error(`getUsuarioById: ${(error as Error).message}`);
    }
  }
  export const createUsuario = async (data: any) => {
    try {
      if (!data || typeof data !== 'object') throw new Error('Datos de usuario requeridos');
      const res = await fetchWithAuth(`${API_URL}/usuarios`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Error al crear usuario');
      const result = await res.json();
      if (!result || typeof result !== 'object') throw new Error('Respuesta inválida al crear usuario');
      return result;
    } catch (error) {
      throw new Error(`createUsuario: ${(error as Error).message}`);
    }
  }
  export const updateUsuario =  async (id: string, data: any) => {
    try {
      if (!id) throw new Error('ID de usuario requerido');
      if (!data || typeof data !== 'object') throw new Error('Datos de usuario requeridos');
      const res = await fetchWithAuth(`${API_URL}/usuarios/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Error al actualizar usuario');
      const result = await res.json();
      if (!result || typeof result !== 'object') throw new Error('Respuesta inválida al actualizar usuario');
      return result;
    } catch (error) {
      throw new Error(`updateUsuario: ${(error as Error).message}`);
    }
  }
  export const deleteUsuario= async (id: string) => {
    try {
      if (!id) throw new Error('ID de usuario requerido');
      const res = await fetchWithAuth(`${API_URL}/usuarios/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar usuario');
      const result = await res.json();
      if (!result || typeof result !== 'object') throw new Error('Respuesta inválida al eliminar usuario');
      return result;
    } catch (error) {
      throw new Error(`deleteUsuario: ${(error as Error).message}`);
    }
  }


