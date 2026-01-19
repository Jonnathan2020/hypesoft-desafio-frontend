"use client";

import ChartOverview from "@/components/charts/totalProducts/index";
import { ItemsLowStock } from "@/components/layout/itemsLowStock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, Package2, PackageMinus, PackageOpen } from "lucide-react";
import api, { apiService } from "@/services/api"
import { useEffect, useState } from "react";
import Dashboard from "../dashboard/page";

console.log("API IMPORTADA É:", api);

type Dashboard = {
  totalProdutos: number;
  totalCusto: number;
  totalValores: number;
  produtosEstoqueBaixo: Object;
  totalCategorias: number;
}

type Produto = {
  nome : string;
  descricao : string;
  custo : number;
  preco : number;
  categoriaId : string;
  quantidadeEstoque : number;
};

export default function Home() {
  
  const [produto, setProduto] = useState<Produto>();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [stats, setStats] = useState<Dashboard>();
  const [loading, setLoading] = useState(true);
  const [totalEstoque, setTotalEstoque] = useState(0);
  const num = 100;
  
  //Dashboard
  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await apiService.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []); // 👈 IMPORTANTE: array vazio (SEM LOOP)
  
  //Produto
  useEffect(() => {
    async function loadProduto() {
      try {
        const data = await apiService.getProducts();
        setProduto(data);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadProduto();
  }, []); // 👈 IMPORTANTE: array vazio (SEM LOOP)
  if (loading) return <p>Carregando...</p>;
  
  
  return (
    <main className="sm:ml-48 p-4">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 select-none">
          Home
        </h1>
        <p className="text-gray-500 mt-1">
          Painel de controle do estoque
        </p>
      </header>
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-x1 text-gray-600 select-none">
                Total itens
              </CardTitle>
              <Package2 className="ml-auto w-5 h-5"/>
            </div>

            <CardDescription>
              Total de itens cadastrados
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">{stats?.totalProdutos}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-x1 text-gray-600 select-none">
                Estoque Total
              </CardTitle>
              <PackageOpen className="ml-auto w-5 h-5"/>
            </div>

            <CardDescription>
              Total de itens no Estoque
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">{num}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-x1 text-gray-600 select-none">
                Valor em Estoque
              </CardTitle>
              <CircleDollarSign className="ml-auto w-5 h-5"/>
            </div>

            <CardDescription>
              Total de Preco em estoque
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">R${stats?.totalValores}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-x1 text-gray-600 select-none">
                Itens Estoque Baixo
              </CardTitle>
              <PackageMinus className="ml-auto w-5 h-5"/>
            </div>

            <CardDescription>
              Total de itens com estoque baixo
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">{}</p>
          </CardContent>
        </Card>
      </section>
      <section className="mt-4 flex flex-col md:flex-row gap-4">  
        <ChartOverview />
        <ItemsLowStock />
      </section>
    </main>
  );
}
