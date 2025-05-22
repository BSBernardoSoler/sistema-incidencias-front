import { envs } from "@/config/envs";
import { fetchWithAuth } from "@/utils/fetchFunction";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetchWithAuth(
    `${envs.backend}/observaciones`,
    { method: 'GET' }
  );

  if (!res.ok) {
    return NextResponse.json(
      { message: 'Error al obtener observaciones' },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}