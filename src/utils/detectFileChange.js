const axios = require("axios");
const fs = require("fs");

let previousTimestamp = fs.readFile(
  "timestamp.txt",
  "utf8",
  (_err, data) => data
);

const detectFileChange = async () => {
  console.log("Running schedule task to detect json file change");
  let isFileChanged = false;
  try {
    const response = await axios.head(process.env.NEXT_PUBLIC_JSON_URL);
    // const response = await axios.head("./matches.json");
    const currentTimestamp = response.headers["last-modified"];
    if (previousTimestamp && previousTimestamp !== currentTimestamp)
      isFileChanged = true;

    currentTimestamp;
    fs.writeFile("timestamp.txt", currentTimestamp, (err) => {
      if (err) throw err;
    });
    return isFileChanged;
  } catch (error) {
    return isFileChanged;
  }
};

module.exports = detectFileChange;
