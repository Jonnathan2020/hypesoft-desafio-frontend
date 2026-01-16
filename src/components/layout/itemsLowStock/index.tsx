"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageMinus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditProduct from "@/components/forms/EditProduct";
import DeleteProduct from "@/components/forms/DeleteProduct";
import { Button } from "@/components/ui/button";

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  custo: number;
  preco: number;
  categoria: string;
  estoque: number;
}

interface ItemsLowStockProps {
  produtos?: Produto[];
  onEdit?: (produtoAtualizado: Produto) => void;
  onDelete?: (id: number) => void;
}

export function ItemsLowStock({ produtos, onEdit, onDelete }: ItemsLowStockProps) {
  const itensBaixoEstoque: Produto[] = produtos ?? [
    { id: 1, nome: "Cabo HDMI", descricao: "detalhes do produto", custo: 7, preco: 18, categoria: "Jogos", estoque: 3 },
    { id: 2, nome: "Mouse USB", descricao: "detalhes do produto", custo: 5, preco: 20, categoria: "Jogos", estoque: 7 },
    { id: 3, nome: "Teclado", descricao: "detalhes do produto", custo: 20, preco: 50, categoria: "jogos", estoque: 2 },
  ];

  return (
    <Card className="w-full md:w-1/2 md:max-w-[600px]">
      <CardHeader>
        <div className="flex items-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800">
            Itens Baixo Estoque
          </CardTitle>
          <PackageMinus className="ml-auto w-5 h-5 text-red-500" />
        </div>
        <CardDescription className="mt-1">
          Todos itens com estoque menor que 10un
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nome</TableHead>
                <TableHead>Custo</TableHead>
                <TableHead>Venda</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead className="text-center">Editar</TableHead>
                <TableHead className="text-center">Excluir</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {itensBaixoEstoque.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{item.nome}</TableCell>
                  <TableCell>${item.custo}</TableCell>
                  <TableCell>${item.preco}</TableCell>
                  <TableCell className="text-red-600 font-semibold">{item.estoque}</TableCell>

                  {/* Botão Editar */}
                  <TableCell className="flex  gap-2">
                    <EditProduct
                      produto={item}
                      onEdit={(produtoAtualizado) =>
                        onEdit && onEdit({
                          ...produtoAtualizado, id: item.id,
                          preco: 0
                        })
                      }
                    />
                  </TableCell>

                  {/* Botão Excluir */}
                  <TableCell className="gap-2">
                    <DeleteProduct
                      produto={item as Produto}
                      onDelete={() => onDelete && onDelete(item.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
