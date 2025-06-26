// app/api/projects/route.ts
import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()

  const { title, description, category, status, image } = body

  const { data, error } = await supabase.from("projects").insert([
    {
      title,
      description,
      category,
      status,
      image,
      created_at: new Date().toISOString(),
    },
  ]).select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data || data.length === 0) {
  return NextResponse.json({ error: "Falha ao criar projeto." }, { status: 500 })
}

return NextResponse.json(data[0])
}
