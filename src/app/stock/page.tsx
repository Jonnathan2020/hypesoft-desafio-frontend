"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemsLowStock } from "@/components/layout/itemsLowStock";
import ProductsTable from "@/components/layout/ProductsTable";
import AddProduct, { Produto } from "@/components/forms/AddProduct";

export default function Stock() {
  // Estado com produtos de exemplo
  const [produtos, setProdutos] = useState<Produto[]>([
    { nome: "Cabo HDMI", descricao: "Cabo 2 metros", custo:10, preco: 50, categoria: "Eletrônicos", estoque: 10 },
    { nome: "Mouse USB", descricao: "Mouse óptico USB",custo:5, preco: 30, categoria: "Periféricos", estoque: 5 },
    { nome: "Teclado Mecânico", descricao: "Teclado RGB",custo:60, preco: 120, categoria: "Periféricos", estoque: 3 },
    { nome: "Fone Bluetooth", descricao: "Fone sem fio",custo:99, preco: 200, categoria: "Eletrônicos", estoque: 7 },
    { nome: "Mousepad", descricao: "Mousepad Gamer",custo:1, preco: 20, categoria: "Acessórios", estoque: 15 },
  ]);

  // Adicionar produto
  const handleAddProduct = (produto: Produto) => {
    setProdutos((prev) => [...prev, produto]);
  };

  // Editar produto
  const handleEditProduct = (index: number, produtoAtualizado: Produto) => {
    const updated = [...produtos];
    updated[index] = produtoAtualizado;
    setProdutos(updated);
  };

  // Excluir produto
  const handleDeleteProduct = (index: number) => {
    const updated = [...produtos];
    updated.splice(index, 1);
    setProdutos(updated);
  };

  return (
    <main className="sm:ml-48 p-4">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 select-none">
          Estoque
        </h1>
        <p className="text-gray-500 mt-1">
          Painel de inventário de estoque
        </p>
      </header>

      {/* Itens de estoque baixo */}
      <section className="mb-4">
        <ItemsLowStock/>
      </section>

      {/* Card de produtos com tabela */}
      <section className="mb-4">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
              Produtos em Estoque
            </CardTitle>
            {/* Botão para adicionar produto */}
            <AddProduct onAdd={handleAddProduct} />
          </CardHeader>
          <CardContent>
            <ProductsTable
              produtos={produtos}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
