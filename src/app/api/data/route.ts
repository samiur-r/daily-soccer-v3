import fs from "fs";
import path from "path";

import useStore from "@/store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") as string;

  try {
    const cachedData = useStore.getState().data;

    if (!cachedData || parseInt(page, 10) !== useStore.getState().currentPage) {
      const filePath = path.resolve("./data.json");
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      useStore.setState({
        data,
        currentPage: parseInt(page),
      });
    }

    const startIdx = (parseInt(page, 10) - 1) * 10;
    const endIdx = startIdx + 10;
    const paginatedData: any = cachedData.slice(startIdx, endIdx);

    return new Response(paginatedData, { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
