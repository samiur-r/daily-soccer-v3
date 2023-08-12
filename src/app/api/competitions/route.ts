import { headers } from "next/headers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const competition = searchParams.get("competition") as string;

  const headersList = headers();
  const referer = headersList.get("referer");

  if (
    !referer ||
    !referer.startsWith(process.env.NEXT_PUBLIC_DOMAIN as string)
  ) {
    return new Response(
      "Forbidden - Access from this referer is not allowed.",
      { status: 403 }
    );
  }

  try {

    return new Response(JSON.stringify('response'), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
