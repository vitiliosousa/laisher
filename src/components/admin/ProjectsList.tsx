import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EmptyState from "@/components/admin/EmptyState";
import { Project } from "@/types/types";



interface ProjectsListProps {
  projects: Project[];
  searchTerm: string;
  filterCategory: string;
  viewMode: "grid" | "list";
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
  
}


export default function ProjectsList({
  projects,
  searchTerm,
  filterCategory,
  viewMode,
  onEdit,
  onDelete,
}: ProjectsListProps) {

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || project.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  

  if (filteredProjects.length === 0) {
    return (
      <h1>Nenhum projeto encontrado</h1>
    );
  }

  return (
    <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
      {filteredProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          viewMode={viewMode}
          onEdit={() => onEdit(project)}
          onDelete={() => onDelete(project.id)}
        />
      ))}
    </div>
  );
}

const ProjectCard = ({
  project,
  viewMode,
  onEdit,
  onDelete,
}: {
  project: Project;
  viewMode: "grid" | "list";
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return viewMode === "grid" ? (
    <Card className="bg-white hover:shadow-lg transition-shadow">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={project.status === "published" ? "default" : "secondary"}>
            {project.status === "published" ? "Publicado" : "Rascunho"}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-white/90">
            {project.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {project.description}
          </p>
          <div className="text-xs text-gray-500">
            Criado em {new Date(project.createdAt).toLocaleDateString("pt-BR")}
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onEdit}
              className="flex-1"
            >
              <Edit className="mr-1 h-3 w-3" />
              Editar
            </Button>
            <DeleteButton onDelete={onDelete} projectTitle={project.title} />
          </div>
        </div>
      </CardContent>
    </Card>
  ) : (
    <Card className="bg-white hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                  {project.description}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline">{project.category}</Badge>
                  <Badge variant={project.status === "published" ? "default" : "secondary"}>
                    {project.status === "published" ? "Publicado" : "Rascunho"}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(project.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={onEdit}>
                  <Edit className="mr-1 h-3 w-3" />
                  Editar
                </Button>
                <DeleteButton onDelete={onDelete} projectTitle={project.title} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DeleteButton = ({
  onDelete,
  projectTitle,
}: {
  onDelete: () => void;
  projectTitle: string;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Projeto</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o projeto "{projectTitle}"? Esta ação não pode ser
            desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};