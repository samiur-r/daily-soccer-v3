import fetchMatches from "@/utils/fetchMatches";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") as string;

  try {
    const response = await fetchMatches(parseInt(page, 10));
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
