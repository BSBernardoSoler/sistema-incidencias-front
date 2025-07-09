"use client";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

interface VerificadorVistaProps {
    children: ReactNode;
    rolesPermitidos: Array<"digitador" | "admin" | "doctor">;
}

const VerificadorVista: React.FC<VerificadorVistaProps> = ({
    children,
    rolesPermitidos,
}) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            signOut({ callbackUrl: "auth/login" });
            return;
        }
        const token = session?.token; 

        if (!token || isTokenExpired(token)) {
            signOut({ callbackUrl: "auth/login" });
            return;
        }

        // Suponiendo que el rol está en session.user.rol
        const userRol = session.user?.role as "digitador" | "admin" | "doctor" | undefined;

        if (!userRol || !rolesPermitidos.includes(userRol)) {
                  
            return;
        }
    }, [session, status, router, rolesPermitidos]);

    if (status === "loading") return null;

    const userRol = session?.user?.role as "digitador" | "admin" | "doctor" | undefined;
    if (!session || !userRol || !rolesPermitidos.includes(userRol)) {
        return <></>;
    }

    return <>{children}</>;
};

export default VerificadorVista;
function isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000;
    return Date.now() > exp;
}

