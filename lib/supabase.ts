import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the browser
export const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  return createClient(supabaseUrl, supabaseAnonKey)
}

// Create a single supabase client for server components
export const createServerClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL as string
  // Use the anon key instead of service role key to avoid JSON parsing errors
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false, // we don't need cookies in server components
      autoRefreshToken: false,
    },
  })
}
