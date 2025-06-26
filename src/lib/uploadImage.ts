// utils/uploadImage.ts
import { supabase } from "@/lib/supabase"

export async function uploadImage(file: File): Promise<string | null> {
  const ext = file.name.split(".").pop()
  const fileName = `${Date.now()}.${ext}`
  const filePath = `projects/${fileName}`

  const { error } = await supabase.storage
    .from("project-images")
    .upload(filePath, file)

  if (error) {
    console.error("Erro ao fazer upload da imagem:", error.message)
    return null
  }

  const { data: publicUrlData } = supabase.storage
    .from("project-images")
    .getPublicUrl(filePath)

  return publicUrlData.publicUrl
}
