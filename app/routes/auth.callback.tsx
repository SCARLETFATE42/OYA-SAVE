import { redirect } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { createSupabaseServerClient } from "../lib/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/home"; // Where to send user after login

  if (code) {
    const { supabase, headers } = createSupabaseServerClient(request);
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return redirect(next, { headers });
    } else {
      console.error("OAuth callback error from Supabase:", error);
    }
  }

  // Return to sign in if there's an error
  return redirect("/signinPage?error=oauth_callback_failed");
}
