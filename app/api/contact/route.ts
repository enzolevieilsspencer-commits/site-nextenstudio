import { NextResponse } from "next/server";
import { Resend } from "resend";

type Body = {
  name?: string;
  email?: string;
  message?: string;
};

function isValid(body: Body) {
  const nameOk = (body.name || "").trim().length >= 2;
  const email = (body.email || "").trim();
  const emailOk = email.includes("@") && email.length <= 254;
  const messageOk = (body.message || "").trim().length >= 10;
  return nameOk && emailOk && messageOk;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Body | null;
  if (!body || !isValid(body)) {
    return NextResponse.json(
      { error: "Champs invalides. Vérifie nom, email et message." },
      { status: 400 },
    );
  }

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    return NextResponse.json(
      {
        error:
          "Service email non configuré. Ajoute RESEND_API_KEY et CONTACT_*.",
      },
      { status: 500 },
    );
  }

  const subject = `Nouveau message — ${body.name}`;
  const text = [
    `Nom: ${body.name}`,
    `Email: ${body.email}`,
    "",
    (body.message || "").trim(),
  ].join("\n");

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: CONTACT_FROM,
    to: CONTACT_TO,
    subject,
    text,
    replyTo: (body.email || "").trim(),
  });

  if (error) {
    return NextResponse.json(
      { error: "Impossible d’envoyer le message pour le moment." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

