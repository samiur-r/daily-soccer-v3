export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") as string;

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_JSON_URL as string);
    const data = await res.json();
    console.log(data)
    const totalItems = data.length;

    const startIdx = (parseInt(page, 10) - 1) * 10;
    const endIdx = startIdx + 10;
    const paginatedData: any = JSON.stringify(data.slice(startIdx, endIdx));

    const response = JSON.stringify({ data: paginatedData, totalItems });

    return new Response(response, { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
