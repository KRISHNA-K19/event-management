import { NextResponse } from "next/server";
import { createServerSupabase } from "@repo/lib/supabase/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  const supabaseServer = await createServerSupabase();
  const { error } = await supabaseServer
    .from("applications")
    .update({ status: "approved" })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Approved" });
}
