import { supabase } from '$lib/supabase'

export async function GET({ url }) {
    const search_term = url.searchParams.get('q')
}