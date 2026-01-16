// src/components/Layout.tsx
import React,{ type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex-shrink-0">
        {/* Conteúdo da Sidebar aqui (links, logo, etc) */}
        <div className="p-4 text-xl font-semibold">Meu Dashboard</div>
        {/* Adicione links de navegação aqui */}
      </aside>

      {/* Área Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Nav */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-lg font-medium">Visão Geral</h1>
          {/* Itens de usuário/notificações aqui */}
        </header>

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
