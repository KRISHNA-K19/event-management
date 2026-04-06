import { NextResponse } from "next/server";
import { createServerSupabase } from "@repo/lib/supabase/server";

export async function PUT(req: Request) {
  const supabaseServer = await createServerSupabase();
  
  // Verify Admin Auth
  const { data: { user } } = await supabaseServer.auth.getUser();
  if (user?.email !== 'krishnamoorthyk.cse@gmail.com') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const { date, imageUrl, ...rest } = await req.json();
  const updateData = { ...rest, event_date: date, image_url: imageUrl };

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const { error } = await supabaseServer.from("events").update(updateData).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Event updated" });
}
