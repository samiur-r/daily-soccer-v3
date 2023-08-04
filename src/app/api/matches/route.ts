import axios from "axios";
// import fs from "fs";
// import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") as string;

  try {
    // const filePath = path.resolve("./matches.json");
    // const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const { data } = await axios.get(
      "https://dondelodanhbmecdrfz62tpo3f89htjtgb4kuu4zx5t8idyjdphj9xnj8gjb.s3.eu-west-1.amazonaws.com/events_y473sycnsryug46z7vbw4xhjc2238pq2nzicw5vh6h8gypgzaw.json"
    );
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
