import axios from "axios";

let previousTimestamp = null;

const checkFileModification = async () => {
  try {
    const response = await axios.head(process.env.NEXT_PUBLIC_JSON_URL);
    const currentTimestamp = response.headers["last-modified"];
    if (previousTimestamp && previousTimestamp !== currentTimestamp) {
      console.log("File has been modified.");
      // Here, you can trigger the logic you want to perform on file modification.
    }
    previousTimestamp = currentTimestamp;
  } catch (error) {
    console.error("Error while fetching the file:", error.message);
  }
};

checkFileModification();
