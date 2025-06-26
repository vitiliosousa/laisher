"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@/types/types";


interface ProjectFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Project | null;
  onSave: (data: Omit<Project, 'id' | 'createdAt'>, id?: number) => void;
}

const categories = ["Residencial", "Comercial", "Institucional"];

export default function ProjectFormModal({
  isOpen,
  onOpenChange,
  project,
  onSave,
}: ProjectFormModalProps) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    category: project?.category || "",
    image: project?.image || "",
    status: project?.status || "draft",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    project?.image || null
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

   
  const handleSubmit = () => {
    onSave({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      image: imagePreview || "/placeholder.svg",
      status: formData.status,
    }, project?.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Editar Projeto" : "Novo Projeto"}</DialogTitle>
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
            <label className="text-sm font-medium text-black">Descrição</label>
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
              <label className="text-sm font-medium text-black">Categoria</label>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={
              !formData.title || !formData.description || !formData.category
            }
          >
            {project ? "Salvar Alterações" : "Criar Projeto"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}