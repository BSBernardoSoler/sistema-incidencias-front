'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';



interface ProviderProps {
    children: ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;