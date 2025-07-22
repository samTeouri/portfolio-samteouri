;/>
\
1. Replace the entire `createServerClient\`
function
with the snippet
below (keep the import at the top of the file)
:

```ts
// Create a Supabase client for Server Components / Server Actions
export const createServerClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL as string
  // ⚠️ Use the anon key in server-side contexts too; the service role
  // key is often NOT exposed in Vercel Preview/PR deployments.
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false, // we don’t need cookies in RSC
      autoRefreshToken: false,
    },
  })
}
