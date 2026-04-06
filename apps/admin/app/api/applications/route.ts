import { NextResponse } from "next/server";
import { createServerSupabase } from "@repo/lib/supabase/server";

export async function GET() {
  const supabase = await createServerSupabase();
  
  // Verify Admin Auth
  const { data, error } = await supabase
  .from("applications")
  .select(`
    id,
    status,
    created_at,
    user_id,
    event_id,
    event:event_id (
      title
    ),
    profile:user_id (
      full_name,
      email
    )
  `)
  .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // We don't have a profiles table join because the previous SQL fix points to auth.users.
  // Supabase doesn't allow joining auth.users directly via .select().
  // So we just return the user_id for now, or the admin can look them up.
  return NextResponse.json(data);
}
