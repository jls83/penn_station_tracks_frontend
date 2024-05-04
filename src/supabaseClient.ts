import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'
import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

async function getRoutes() {
  const q = supabase
    .from('routes')
    .select(`route_long_name, route_color, route_text_color`);

  const res = await q;
  return res
}
