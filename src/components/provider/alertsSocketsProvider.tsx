// components/provider/AlertSocketProvider.tsx
'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addAlert } from '@/redux/store/alertsSlice';
import socket from '@/lib/socket';

export default function AlertSocketProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNewAlert = (nuevaAlerta: any) => {
      dispatch(addAlert(nuevaAlerta));
    };

    socket.on('dataUpdate', handleNewAlert);

    return () => {
      socket.off('dataUpdate', handleNewAlert);
    };
  }, [dispatch]);

  return <>{children}</>;
}
