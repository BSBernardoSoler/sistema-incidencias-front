import { envs } from "@/config/envs";
import { fetchWithAuth } from "@/utils/fetchFunction";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const res = await fetchWithAuth(
        `${envs.backend}/pdf-report/reporte/alertas`,
        { method: 'GET' }
    );

    if (!res.ok) {
        let data;
        try {
            data = await res.json();
        } catch {
            data = { message: 'Error al obtener pdf' };
        }
        return NextResponse.json(
            { message: data.message || 'Error al obtener pdf' },
            { status: 500 }
        );
    }

    const pdfBuffer = await res.arrayBuffer();

    return new NextResponse(Buffer.from(pdfBuffer), {
        status: 200,
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=alertas.pdf",
        },
    });
}

