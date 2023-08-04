import axios from "axios";

let previousTimestamp: any = null;

const detectFileChange = async () => {
  console.log("Running schedule task to detect json file change");
  let isFileChanged = false;
  try {
    const response = await axios.head(
      process.env.NEXT_PUBLIC_JSON_URL as string
    );
    // const response = await axios.head("./matches.json");
    const currentTimestamp = response.headers["last-modified"];
    if (previousTimestamp && previousTimestamp !== currentTimestamp)
      isFileChanged = true;

    previousTimestamp = currentTimestamp;
    return isFileChanged;
  } catch (error) {
    return isFileChanged;
  }
};

export default detectFileChange;
