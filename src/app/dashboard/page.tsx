import ChartOverview from "@/components/charts/totalProducts/index";
import { ItemsLowStock } from "@/components/layout/itemsLowStock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, DollarSign, DollarSignIcon, Package2, PackageMinus, PackageOpen } from "lucide-react";

export default function Dashboard() {
  const num = 999
  return (
    <main className="sm:ml-48 p-4">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 select-none">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Informações dos Produtos
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
            <p className="text-base sm:text-lg font-bold">{num}</p>
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
              Total de custo em estoque
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">R${num}</p>
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
            <p className="text-base sm:text-lg font-bold">{num}</p>
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
