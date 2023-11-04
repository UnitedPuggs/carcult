import { supabase } from '$lib/supabase'
import { generate } from 'random-words'

export async function POST({ request, locals }) {
    const { title, price, description } = await request.json();
    const session = await locals.getSession();

    let words = generate({ exactly: 3 })
    const id = words.join("-")

    const { data, error } = await supabase
    .from('marketplace_listings')
    .insert([
        { 
            id: id,
            seller: session.user.displayname,
            item_name: title,
            price: price,
            item_description: description
        }
    ])
    .select()

    if(error)
        return error
    else
        return new Response({status: 200})
}