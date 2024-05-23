export async function GET(request) {
    const date = new Date()
    return Response.json({"healthy": date})
}