"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { PackageOpen } from "lucide-react";
import { BarChart, Bar, CartesianGrid, XAxis, Tooltip, Legend } from "recharts";

export default function ChartOverview() {
  // Dados de exemplo por mês e categoria
  const chartData = [
    { month: "January", category: "Eletrônicos", custo: 120, estoque: 50, lucro: 80 },
    { month: "January", category: "Acessórios", custo: 70, estoque: 30, lucro: 50 },
    { month: "February", category: "Eletrônicos", custo: 130, estoque: 40, lucro: 90 },
    { month: "February", category: "Periféricos", custo: 90, estoque: 20, lucro: 60 },
    { month: "March", category: "Acessórios", custo: 80, estoque: 25, lucro: 55 },
    { month: "March", category: "Periféricos", custo: 100, estoque: 30, lucro: 70 },
    { month: "April", category: "Eletrônicos", custo: 110, estoque: 45, lucro: 85 },
    { month: "May", category: "Outros", custo: 40, estoque: 10, lucro: 25 },
    { month: "June", category: "Eletrônicos", custo: 140, estoque: 50, lucro: 95 },
  ];

  // Configuração de cores
  const chartConfig = {
    custo: { label: "Custo", color: "#ef4444" },       // vermelho
    estoque: { label: "Estoque", color: "#2563eb" },  // azul
    lucro: { label: "Lucro", color: "#16a34a" },      // verde
  } satisfies ChartConfig;

  const [selectedCategory, setSelectedCategory] = useState<"All" | string>("All");

  // Lista de categorias
  const categories = ["All", ...Array.from(new Set(chartData.map(d => d.category)))];

  // Filtra os dados de acordo com a categoria selecionada
  const filteredData = chartData.filter(d => selectedCategory === "All" || d.category === selectedCategory);

  // Agrupa os dados por mês (somando valores se houver mais de uma categoria por mês)
  const groupedData: { month: string; custo: number; estoque: number; lucro: number }[] = [];

  filteredData.forEach(d => {
    const existing = groupedData.find(g => g.month === d.month);
    if (existing) {
      existing.custo += d.custo;
      existing.estoque += d.estoque;
      existing.lucro += d.lucro;
    } else {
      groupedData.push({ month: d.month, custo: d.custo, estoque: d.estoque, lucro: d.lucro });
    }
  });

  return (
    <Card className="w-full md:w-2/4 md:max-w-[800px]">
      <CardHeader>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg sm:text-xl text-gray-800">Produtos</CardTitle>
            <PackageOpen className="ml-auto w-5 h-5" />
          </div>

          {/* Dropdown de categoria */}
          <div className="mt-2 w-1/2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart
            data={groupedData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            barGap={10}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <Tooltip />
            <Legend />

            <Bar dataKey="custo" fill={chartConfig.custo.color} radius={[4, 4, 0, 0]} />
            <Bar dataKey="estoque" fill={chartConfig.estoque.color} radius={[4, 4, 0, 0]} />
            <Bar dataKey="lucro" fill={chartConfig.lucro.color} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
