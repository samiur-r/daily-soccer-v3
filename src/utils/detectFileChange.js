const axios = require("axios");

let previousTimestamp = null;

const checkFileModification = async () => {
  console.log("Running schedule task to detect json file change");
  try {
    const response = await axios.head(
      "https://dondelodanhbmecdrfz62tpo3f89htjtgb4kuu4zx5t8idyjdphj9xnj8gjb.s3.eu-west-1.amazonaws.com/events_y473sycnsryug46z7vbw4xhjc2238pq2nzicw5vh6h8gypgzaw.json"
    );
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
