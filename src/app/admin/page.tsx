"use client";

import type React from "react";
import { useState } from "react";
import { uploadImage } from "@/lib/uploadImage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminHeader from "@/components/admin-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Search,
  Filter,
  Grid,
  List,
} from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  createdAt: string;
  status: "published" | "draft";
}

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  const [projects, setProjects] = useState<Project[]>([])

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects")
      if (!res.ok) throw new Error("Erro ao buscar projetos")
      const data = await res.json()
      setProjects(data)
    } catch (err) {
      console.error("Erro:", err)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    status: "draft" as "published" | "draft",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categories = ["Residencial", "Comercial", "Institucional"];

  const handleNewProject = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      image: "",
      status: "draft",
    });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      image: project.image,
      status: project.status,
    });
    setImagePreview(project.image);
    setIsModalOpen(true);
  };

 const handleDeleteProject = async (id: number) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      setProjects((prev) => prev.filter((proj) => proj.id !== id))
    } else {
      alert("Erro ao excluir projeto")
    }
  }

 const handleSaveProject = async () => {
  let imageUrl = formData.image // pode já existir ao editar

  // Se for novo upload
  if (imageFile) {
    const uploaded = await uploadImage(imageFile)
    if (!uploaded) {
      alert("Falha ao enviar imagem.")
      return
    }
    imageUrl = uploaded
  }

  const payload = {
    ...formData,
    image: imageUrl,
  }

  const method = editingProject ? "PUT" : "POST"
  const endpoint = editingProject
    ? `/api/projects/${editingProject.id}`
    : `/api/projects`

  const res = await fetch(endpoint, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const result = await res.json()

  if (!res.ok) {
    alert(result.error || "Erro ao salvar projeto.")
    return
  }

  // resetar estado ou fechar modal
  setFormData({ title: "", description: "", category: "", status: "draft", image: "" })
  setImageFile(null)
  setImagePreview(null)
  setIsModalOpen(false)
  setEditingProject(null);
}


  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || project.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <AdminHeader />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-black">
                  Painel Administrativo
                </h1>
                <p className="text-black mt-1">
                  Gerencie os projetos do portfolio
                </p>
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

          {/* Filtros e Busca */}
          <div className="mb-8">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Buscar projetos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Select
                      value={filterCategory}
                      onValueChange={(value) => setFilterCategory(value)}
                    >
                      <SelectTrigger className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Todas as categorias" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as categorias</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="flex border border-gray-300 rounded-md">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Estatísticas */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total de Projetos</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {projects.length}
                    </p>
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

            {/* Lista de Projetos */}
            <div
              className={
                viewMode === "grid"
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-white hover:shadow-lg transition-shadow"
                >
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge
                            variant={
                              project.status === "published"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {project.status === "published"
                              ? "Publicado"
                              : "Rascunho"}
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
                            Criado em{" "}
                            {new Date(project.createdAt).toLocaleDateString(
                              "pt-BR"
                            )}
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditProject(project)}
                              className="flex-1"
                            >
                              <Edit className="mr-1 h-3 w-3" />
                              Editar
                            </Button>
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
                                  <AlertDialogTitle>
                                    Excluir Projeto
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja excluir o projeto "
                                    {project.title}"? Esta ação não pode ser
                                    desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteProject(project.id)
                                    }
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </>
                  ) : (
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
                                <Badge variant="outline">
                                  {project.category}
                                </Badge>
                                <Badge
                                  variant={
                                    project.status === "published"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {project.status === "published"
                                    ? "Publicado"
                                    : "Rascunho"}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {new Date(project.createdAt).toLocaleDateString(
                                    "pt-BR"
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditProject(project)}
                              >
                                <Edit className="mr-1 h-3 w-3" />
                                Editar
                              </Button>
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
                                    <AlertDialogTitle>
                                      Excluir Projeto
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir o projeto "
                                      {project.title}"? Esta ação não pode ser
                                      desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteProject(project.id)
                                      }
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

          {filteredProjects.length === 0 && (
            <Card className="bg-white">
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum projeto encontrado
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || filterCategory !== "all"
                    ? "Tente ajustar os filtros de busca"
                    : "Comece criando seu primeiro projeto"}
                </p>
                {!searchTerm && filterCategory === "all" && (
                  <Button
                    onClick={handleNewProject}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Primeiro Projeto
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Modal do Formulário */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Editar Projeto" : "Novo Projeto"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Título</label>
              <Input
                placeholder="Digite o título do projeto"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-black">
                Descrição
              </label>
              <Textarea
                placeholder="Descreva o projeto..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="min-h-24"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-black">
                  Categoria
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-black">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      status: value as "published" | "draft",
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="gap-4">
              <label className="text-sm font-medium text-black">
                Imagem de Capa
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] max-w-sm mx-auto overflow-hidden rounded-lg">
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <Button
                        variant="outline"
                        onClick={() => setImagePreview(null)}
                        size="sm"
                      >
                        Remover Imagem
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        Clique para fazer upload ou arraste uma imagem
                      </p>
                      <p className="text-sm text-gray-500">PNG, JPG até 10MB</p>
                    </div>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <Button variant="outline" className="pointer-events-none">
                        <Upload className="mr-2 h-4 w-4" />
                        Selecionar Arquivo
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveProject}
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={
                !formData.title || !formData.description || !formData.category
              }
            >
              {editingProject ? "Salvar Alterações" : "Criar Projeto"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
