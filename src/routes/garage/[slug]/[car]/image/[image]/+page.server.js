export async function load({ params }) {
    const url = `https://knnxtkccpetpqxmvcxmu.supabase.co/storage/v1/object/public/garage_photos/${params.slug}/${params.car}/${params.image}`

    return {
        url
    };
}