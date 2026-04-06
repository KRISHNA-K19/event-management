import { NextResponse } from "next/server";
import { createServerSupabase } from "@repo/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { title, description, location, event_date, created_by } = body;

  const supabaseServer = await createServerSupabase();
  const { error } = await supabaseServer.from("events").insert([
    {
      title,
      description,
      location,
      event_date,
      created_by,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Event created" });
}
