import { NextResponse } from "next/server";
import { createServerSupabase } from "@repo/lib/supabase/server";

export async function GET() {
  const supabaseServer = await createServerSupabase();
  const { data, error } = await supabaseServer
    .from("events")
    .select("*, date:event_date, imageUrl:image_url")
    .order("event_date", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
