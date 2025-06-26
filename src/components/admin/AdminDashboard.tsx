"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Grid, List } from "lucide-react";
import ProjectsStats from "../ProjectsStats";
import ProjectsFilters from "../ProjectsFilters";
import ProjectsList from "../ProjectsList";
import ProjectFormModal from "../ProjectFormModal";

export default function AdminDashboard({ projects }: { projects: Project[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const handleNewProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
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
        onEdit={setEditingProject}
        onModalOpen={setIsModalOpen}
      />

      <ProjectFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        project={editingProject}
      />
    </>
  );
}