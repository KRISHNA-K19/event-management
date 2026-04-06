import { NextResponse } from "next/server";
import { createServerSupabase } from "@repo/lib/supabase/server";

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const supabaseServer = await createServerSupabase();
  
  // Verify Admin Auth
  const { data: { user } } = await supabaseServer.auth.getUser();
  if (user?.email !== 'krishnamoorthyk.cse@gmail.com') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabaseServer.from("events").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Event deleted" });
}
