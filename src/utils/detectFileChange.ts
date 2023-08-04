import axios from "axios";
// import cron from "node-cron";

let previousTimestamp: any = null;

const checkFileModification = async () => {
  try {
    const response = await axios.head(
      process.env.NEXT_PUBLIC_JSON_URL as string
    );
    const currentTimestamp = response.headers["last-modified"];
    if (previousTimestamp && previousTimestamp !== currentTimestamp) {
      console.log("File has been modified.");
      // Here, you can trigger the logic you want to perform on file modification.
    }
    previousTimestamp = currentTimestamp;
  } catch (error: any) {
    console.error("Error while fetching the file:", error.message);
  }
};

// const startFileModificationCheck = () => {
//   // Schedule the cron job to run every hour
//   cron.schedule("0 * * * *", () => {
//     checkFileModification();
//   });
// };

export default checkFileModification();
