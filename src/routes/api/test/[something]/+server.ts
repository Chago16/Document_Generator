export async function GET({ params }) {
    return new Response(`Test param: ${params.something}`, { status: 200 });
}
