import { NextResponse } from "next/server";
import { createServerSupabase } from "@repo/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { user_id, event_id } = body;

  const supabaseServer = await createServerSupabase();
  const { error } = await supabaseServer.from("applications").insert([
    {
      user_id,
      event_id,
      status: "pending",
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Applied successfully" });
}
