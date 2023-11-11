import { supabase } from '$lib/supabase'

export async function GET() {
    
const channels = supabase.channel('custom-all-channel')
.on(
  'postgres_changes',
  { event: '*', schema: 'public', table: 'marketplace_messages' },
  (payload) => {
    console.log('Change received!', payload)
  }
)
.subscribe()

}