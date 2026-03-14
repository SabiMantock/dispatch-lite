import { createClient } from "@supabase/supabase-js"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let supabaseClient: ReturnType<typeof createClient<any>> | null = null

export function getSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabasePublishableKey =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error("Supabase environment variables are missing")
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabaseClient = createClient<any>(supabaseUrl, supabasePublishableKey, {
    auth: {
      persistSession: false,
    },
  })

  return supabaseClient
}
