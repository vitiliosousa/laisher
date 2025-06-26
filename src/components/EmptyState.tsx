import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

interface EmptyStateProps {
  hasSearch: boolean;
  onNewProject: () => void;
}

export default function EmptyState({ hasSearch, onNewProject }: EmptyStateProps) {
  return (
    <Card className="bg-white">
      <CardContent className="p-12 text-center">
        <div className="text-gray-400 mb-4">
          <Search className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Nenhum projeto encontrado
        </h3>
        <p className="text-gray-600 mb-4">
          {hasSearch
            ? "Tente ajustar os filtros de busca"
            : "Comece criando seu primeiro projeto"}
        </p>
        {!hasSearch && (
          <Button
            onClick={onNewProject}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Criar Primeiro Projeto
          </Button>
        )}
      </CardContent>
    </Card>
  );
}