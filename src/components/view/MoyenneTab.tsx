import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableComponent } from "./Table";
import { ChartComponent } from "./Chart";
import { ChartArea, TableProperties } from "lucide-react";
import { DatePickerWithRange } from "./DatePiker";

export function MoyenneTabs() {
  return (
    <Tabs defaultValue="Tableau">
      <TabsList className="flex justify-end w-full sticky top-0 bg-gray-300 z-10 p-2">
        <TabsTrigger value="Tableau">
          <TableProperties />
          Tableau
        </TabsTrigger>
        <TabsTrigger value="Graphique">
          <ChartArea />
          Graphique
        </TabsTrigger>
        <DatePickerWithRange />
      </TabsList>
      <TabsContent value="Tableau">
        <TableComponent />
      </TabsContent>
      <TabsContent value="Graphique">
        <ChartComponent />
      </TabsContent>
    </Tabs>
  );
}