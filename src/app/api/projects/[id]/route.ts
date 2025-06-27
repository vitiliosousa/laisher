import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const { title, description, category, status, image } = body

  const { error } = await supabase
    .from("projects")
    .update({ title, description, category, status, image })
    .eq("id", params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Atualizado com sucesso." })
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { error } = await supabase.from("projects").delete().eq("id", params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Projeto excluído com sucesso." })
}