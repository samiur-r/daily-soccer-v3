import detectFileChange from "@/utils/detectFileChange";

export default async function handler(req, res) {
  if (req.headers.accept && req.headers.accept === "text/event-stream") {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const interval = setInterval(async () => {
      const isFileChanged = await detectFileChange();
      if (!isFileChanged)
        res.write(`data: ${JSON.stringify({ type: "file_change" })}\n\n`);
    }, 300000);

    req.on("close", () => {
        clearInterval(interval);
      res.end();
    });
  } else {
    res.status(404).end();
  }
}
