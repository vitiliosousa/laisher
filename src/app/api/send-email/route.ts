import { Resend } from "resend";
import { NextResponse } from "next/server";
import ContactEmail from "@/emails/ContactEmail";
import { render } from "@react-email/render";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json();

  const emailHtml = await render(
    React.createElement(ContactEmail, { name, email, subject, message })
  );

  try {
    const data = await resend.emails.send({
      from: `${process.env.EMAIL_FROM}`,
      to: [`${process.env.EMAIL_TO}`],
      subject: `${subject}`,
      html: emailHtml,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error });
  }
}
