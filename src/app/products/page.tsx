"use client";

import { Produto } from "@/components/forms/AddProduct";
import SearchForm from "@/components/forms/searchForm/"
import ProductsTable from "@/components/layout/ProductsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useState } from "react";

  
interface ProductsTableProps {
    produtos: Produto[];
  }
  

export default function Products() {
  const [searchResults, setSearchResults] = useState<Produto[]>([]);

  // Dados de exemplo
  const [produtos, setProdutos] = useState<Produto[]>([
    { nome: "Cabo HDMI", descricao: "Cabo 2 metros", custo:10, preco: 50, categoria: "Eletrônicos", estoque: 10 },
    { nome: "Mouse USB", descricao: "Mouse óptico USB",custo:5, preco: 30, categoria: "Periféricos", estoque: 5 },
    { nome: "Teclado Mecânico", descricao: "Teclado RGB",custo:60, preco: 120, categoria: "Periféricos", estoque: 3 },
    { nome: "Fone Bluetooth", descricao: "Fone sem fio",custo:99, preco: 200, categoria: "Eletrônicos", estoque: 7 },
    { nome: "Mousepad", descricao: "Mousepad Gamer",custo:1, preco: 20, categoria: "Acessórios", estoque: 15 },
  ]);
  const categories = ["All", "Eletrônicos", "Periféricos", "Acessórios"];

  // Função para filtrar produtos
  const handleSearch = (term: string, category: string) => {
    const filtered = produtos.filter((p) => {
      const matchName = p.nome.toLowerCase().includes(term.toLowerCase());
      const matchCategory = category === "All" || p.categoria === category;
      return matchName && matchCategory;
    });
    setSearchResults(filtered);
  };

  const handleAddProduct = (produto: Produto) => {
    setProdutos((prev) => [...prev, produto]); // adiciona automaticamente na tabela
  };

  

  return (
    <main className="sm:ml-48 p-4">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 select-none">
          Produtos
        </h1>
        <p className="text-gray-500 mt-1">Painel de controle de Produtos</p>
      </header>

      
      <section className="grid grid-cols-1 lg:grid-cols-1 gap-4 mb-4">
      <Card className="">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <CardTitle className="sm:text-xl text-gray-400 select-none">
                Pesquisa Simples
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <SearchForm categories={categories} onSearch={handleSearch} onAddProduct={handleAddProduct} />
          </CardContent>
        </Card>
      </section>

       {/* Tabela de resultados */}
       <Card className="">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-gray-800">Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductsTable produtos={searchResults} onEdit={function (index: number, produtoAtualizado: Produto): void {
                      throw new Error("Function not implemented.");
                  } } onDelete={function (index: number): void {
                      throw new Error("Function not implemented.");
                  } } />
        </CardContent>
      </Card>
    </main>
  );
}
