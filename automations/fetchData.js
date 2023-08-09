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
            item.Competition.Id === 3312 || // La Liga EA Sports
            item.Competition.Id === 3313 || // LaLiga Hypermotion
            item.Competition.Id === 122 || // Supercopa de España
            item.Competition.Id === 113 || // Supercopa de Europa
            item.Competition.Id === 57 || // MLS
            item.Competition.Id === 346 // Joan Gamper
        );

        const data = JSON.stringify(filteredData, null, 4);

        var params = {
            Bucket: process.env.S3_BUCKET,
            Key: process.env.S3_KEY,
            Body: data
        };

        await s3.upload(params).promise();
        console.log('File uploaded successfully');

    } catch (error) {
        console.error(error);
    }
})();
