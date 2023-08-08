const axios = require('axios');
const AWS = require('aws-sdk');

// Configure AWS with environment credentials
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const options = {
    method: 'GET',
    url: 'https://wosti-futbol-tv-spain.p.rapidapi.com/api/Events',
    headers: {
        'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'wosti-futbol-tv-spain.p.rapidapi.com'
    }
};

(async () => {
    try {
        const response = await axios.request(options);

        const filteredData = response.data.filter(item =>
            item.Competition.Id === 346 // Joan Gamper
        );

        const data = JSON.stringify(filteredData, null, 4);

        var params = {
            Bucket: 'dondelodanhbmecdrfz62tpo3f89htjtgb4kuu4zx5t8idyjdphj9xnj8gjb',
            Key: 'events_y473sycnsryug46z7vbw4xhjc2238pq2nzicw5vh6h8gypgzaw.json',
            Body: data
        };

        await s3.upload(params).promise();
        console.log('File uploaded successfully');

    } catch (error) {
        console.error(error);
    }
})();
