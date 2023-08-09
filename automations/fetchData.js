const axios = require('axios');
const AWS = require('aws-sdk');

// Configure AWS with environment credentials
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const EventsData = {
    method: 'GET',
    url: 'https://wosti-futbol-tv-spain.p.rapidapi.com/api/Events',
    headers: {
        'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'wosti-futbol-tv-spain.p.rapidapi.com'
    }
};

const CompetitionsData = {
    method: 'GET',
    url: 'https://wosti-futbol-tv-spain.p.rapidapi.com/api/Competitions',
    headers: {
        'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'wosti-futbol-tv-spain.p.rapidapi.com'
    }
};

(async () => {
    try {
        const response1 = await axios.request(EventsData);
        const response2 = await axios.request(CompetitionsData);


        const filteredData = response1.data.filter(item =>
            item.Competition.Id === 3312 || // La Liga EA Sports
            item.Competition.Id === 3313 || // LaLiga Hypermotion
            item.Competition.Id === 122 || // Supercopa de España
            item.Competition.Id === 113 || // Supercopa de Europa
            item.Competition.Id === 57 || // MLS
            item.Competition.Id === 346 // Joan Gamper
        );

        // Filtrado de datos de la segunda API (ajusta según tus necesidades)
        const filteredData2 = response2.data.filter(item => {
            // Añade tu lógica de filtrado aquí
            return true; // Esto es solo un ejemplo, ajusta según tus necesidades
        });

        const mergedData = [...filteredData, ...filteredData2];

        const data = JSON.stringify(mergedData, null, 4);

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
