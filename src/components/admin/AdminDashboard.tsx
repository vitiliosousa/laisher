"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProjectsStats from "./ProjectsStats";
import ProjectsFilters from "./ProjectsFilters";
import ProjectsList from "./ProjectsList";
import ProjectFormModal from "./ProjectFormModal";
import { Project } from "@/types/types";

export default function AdminDashboard({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const handleNewProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleSaveProject = (projectData: Omit<Project, 'id' | 'createdAt'>, id?: number) => {
    if (id) {
      // Editar projeto existente
      setProjects(projects.map(p => 
        p.id === id 
          ? { ...p, ...projectData } 
          : p
      ));
    } else {
      // Criar novo projeto
      const newProject: Project = {
        id: Math.max(0, ...projects.map(p => p.id)) + 1,
        ...projectData,
        createdAt: new Date().toISOString().split('T')[0],
        image: projectData.image || "/placeholder.svg",
      };
      setProjects([newProject, ...projects]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black">Painel Administrativo</h1>
            <p className="text-black mt-1">Gerencie os projetos do portfolio</p>
          </div>
          <Button
            onClick={handleNewProject}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Projeto
          </Button>
        </div>
      </div>

      <ProjectsStats projects={projects} />
      <ProjectsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <ProjectsList
        projects={projects}
        searchTerm={searchTerm}
        filterCategory={filterCategory}
        viewMode={viewMode}
        onEdit={(project) => {
          setEditingProject(project);
          setIsModalOpen(true);
        }}
        onDelete={handleDeleteProject}
        
      />

      <ProjectFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        project={editingProject}
        onSave={handleSaveProject}
      />
    </>
  );
}