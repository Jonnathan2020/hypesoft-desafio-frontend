"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

export interface AddProductProps {
    onAdd: (produto: Produto) => void; // função que adiciona o produto na tabela
}
  
export interface Produto {
    nome: string;
    descricao: string;
    categoria: string;
    custo: number;
    preco: number;
    estoque: number;
}

export default function AddProduct({ onAdd }: AddProductProps) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("Eletrônicos");
    const [custo, setCusto] = useState(0);
    const [preco, setPreco] = useState(0);
    const [estoque, setEstoque] = useState(0);

    const [open, setOpen] = useState(false); // controla o modal
    const [alertVisible, setAlertVisible] = useState(false); // controla alert  
    const categories = ["Eletrônicos", "Periféricos", "Acessórios"];

    const handleSubmit = () => {
        const novoProduto: Produto = { nome, descricao, categoria, custo, preco, estoque };
        onAdd(novoProduto); // envia para a tabela

        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 2000);  

        setOpen(false); // fechar modal

        // reset campos
        setNome("");
        setDescricao("");
        setCategoria("Eletrônicos");
        setCusto(0);
        setPreco(0);
        setEstoque(0);
    };

    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full lg:w-auto bg-green-500 hover:bg-green-600 text-white flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              Adicionar Produto
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Adicionar Produto</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col">
                <Label htmlFor="nome" className="mb-1">Nome</Label>
                <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="descricao" className="mb-1">Descrição</Label>
                <Input id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="categoria" className="mb-1">Categoria</Label>
                <select
                  id="categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <Label htmlFor="custo" className="mb-1">Custo</Label>
                <Input id="custo" type="number" value={custo} onChange={(e) => setCusto(Number(e.target.value))} />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="preco" className="mb-1">Preço de venda</Label>
                <Input id="preco" type="number" value={preco} onChange={(e) => setPreco(Number(e.target.value))} />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="estoque" className="mb-1">Quantidade em Estoque</Label>
                <Input id="estoque" type="number" value={estoque} onChange={(e) => setEstoque(Number(e.target.value))} />
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleSubmit}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {alertVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div className="bg-green-500 text-white px-6 py-3 rounded shadow-lg">
                  Produto {nome} adicionado com sucesso!
              </div>
          </div>
        )}
      </>
    );
}
