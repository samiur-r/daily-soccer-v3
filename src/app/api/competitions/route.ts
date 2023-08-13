import { fetchCompetitionMatches } from "@/services/matches";
import { headers } from "next/headers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const competition_name = searchParams.get("competition_name") as string;
  const page = searchParams.get("page") as string;

  //   const headersList = headers();
  //   const referer = headersList.get("referer");

  //   if (
  //     !referer ||
  //     !referer.startsWith(process.env.NEXT_PUBLIC_DOMAIN as string)
  //   ) {
  //     return new Response(
  //       "Forbidden - Access from this referer is not allowed.",
  //       { status: 403 }
  //     );
  //   }

  try {
    const matches = await fetchCompetitionMatches(
      competition_name.replace(/_/g, " "),
      parseInt(page, 10)
    );
    return new Response(JSON.stringify(matches), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
