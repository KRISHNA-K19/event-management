import { NextResponse } from "next/server";
import { createServerSupabase } from "@repo/lib/supabase/server";

export async function POST(req: Request) {
  const supabaseServer = await createServerSupabase();
  
  // Verify Admin Auth
  const { data: { user } } = await supabaseServer.auth.getUser();
  if (user?.email !== 'krishnamoorthyk.cse@gmail.com') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, description, date, location, imageUrl } = body;

  const { data, error } = await supabaseServer.from("events").insert([
    {
      title,
      description,
      location,
      event_date: date,
      image_url: imageUrl,
      created_by: user.id,
    },
  ]).select('id, title, description, location, date:event_date, imageUrl:image_url');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Event created", data });
}

export async function GET() {
  const supabaseServer = await createServerSupabase();
  const { data, error } = await supabaseServer.from("events").select("id, title, description, date:event_date").order("event_date", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
