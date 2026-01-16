"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AddProduct, { Produto } from "../AddProduct";

interface SearchFormProps {
  categories: string[];
  onSearch: (term: string, category: string) => void;
  onAddProduct: (produto: Produto) => void;
}

export default function SearchForm({ categories, onSearch, onAddProduct }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, selectedCategory);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
      
      {/* Campo de nome */}
      <div className="flex flex-col">
        <Label htmlFor="nome" className="text-gray-700 font-medium mb-1">
          Nome
        </Label>
        <Input
          id="nome"
          type="text"
          placeholder="Digite o nome do produto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Dropdown de categoria */}
      <div className="flex flex-col">
        <Label htmlFor="categoria" className="text-gray-700 font-medium mb-1">
          Categoria
        </Label>
        <select
          id="categoria"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Botão de pesquisa */}
      <div className="flex items-end">
        <Button type="submit" className="w-full lg:w-auto">
          Pesquisar
        </Button>
      </div>

      {/* Botão de adicionar produto */}
      <div className="flex items-end">
        <AddProduct onAdd={onAddProduct} />
      </div>
    </form>
  );
}
