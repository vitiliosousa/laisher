import { Card, CardContent } from "@/components/ui/card";
import { Grid, Plus, Edit, Filter } from "lucide-react";


interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  createdAt: string;
  status: "published" | "draft";
}

interface ProjectsStatsProps {
  projects: Project[];
}

export default function ProjectsStats({ projects }: ProjectsStatsProps) {
  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-white">
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Projetos</p>
              <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Grid className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Publicados</p>
              <p className="text-2xl font-bold text-green-600">
                {projects.filter((p) => p.status === "published").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Plus className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rascunhos</p>
              <p className="text-2xl font-bold text-yellow-600">
                {projects.filter((p) => p.status === "draft").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Edit className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Este Mês</p>
              <p className="text-2xl font-bold text-purple-600">3</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Filter className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}