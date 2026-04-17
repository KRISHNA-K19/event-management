import { createClientSupabase } from "../supabase/client";

export async function getCurrentUser() {
  const supabase = createClientSupabase();
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

export async function isAdmin() {
  const supabase = createClientSupabase();
  const user = await getCurrentUser();
  if (!user) return false;

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return data?.role === "admin";
}