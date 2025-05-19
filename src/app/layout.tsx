import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Provider from '@/components/provider/provider';
import { Toaster } from 'react-hot-toast';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <Provider>
          <ThemeProvider>
            <Toaster
            position='top-center'
            />
          <SidebarProvider>
            {children}
            </SidebarProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
