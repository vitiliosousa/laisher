import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const adminEmail = process.env.EMAIL_ADMIN;
  const adminPassword = process.env.PASSWORD_ADMIN;

  if (!adminEmail || !adminPassword) {
    return NextResponse.json(
      { error: "Credenciais do administrador não configuradas." },
      { status: 500 }
    );
  }

  if (email === adminEmail && password === adminPassword) {
    // Aqui você pode gerar um JWT real ou apenas retornar um token fake
    return NextResponse.json({ token: "fake_jwt_token" }, { status: 200 });
  }

  return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
}
