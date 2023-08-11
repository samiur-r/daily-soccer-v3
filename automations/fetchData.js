// Automation for GitHub Actions.

const axios = require('axios');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


// ******************************* //
// Competition IDs to be filtered //
const competitionIdsToFilter = [
    3312, // La Liga EA Sports
    3313, // LaLiga Hypermotion
    122,  // Supercopa de España
    113,  // Supercopa de Europa
    57,   // MLS
    2     // Premier League
];
// ******************************* //
// ******************************* //

/* Clean channel names */
function updateChannelName(data) {
    data.Channels.forEach(channel => {
        if (channel.Name === "Amazon Prime Video (Prueba gratis)") {
            channel.Name = "Amazon Prime Video";
        }
        if (channel.Name === "DAZN (Regístrate)") {
            channel.Name = "DAZN";
        }
        if (channel.Name === "GOL PLAY (Síguelo en directo)") {
            channel.Name = "GOL PLAY";
        }
    });
}

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

        // Get Events
        const responseEvents = await axios.request(EventsData);
        const filteredEvents = responseEvents.data.filter(item =>
            competitionIdsToFilter.includes(item.Competition.Id)
        );
        filteredEvents.forEach(event => updateChannelName(event));

        const dataEvents = JSON.stringify(filteredEvents, null, 4);

        var paramsEvents = {
            Bucket: "dondelodanhbmecdrfz62tpo3f89htjtgb4kuu4zx5t8idyjdphj9xnj8gjb",
            Key: "events_y473sycnsryug46z7vbw4xhjc2238pq2nzicw5vh6h8gypgzaw.json",
            Body: dataEvents
        };
        
        await s3.upload(paramsEvents).promise();


        // Get Competitions
        const responseCompetitions = await axios.request(CompetitionsData);
        const filteredCompetitions = responseCompetitions.data.filter(item =>
            competitionIdsToFilter.includes(item.Id)
        );

        const dataCompetitions = JSON.stringify(filteredCompetitions, null, 4);

        var paramsCompetitions = {
            Bucket: "dondelodanhbmecdrfz62tpo3f89htjtgb4kuu4zx5t8idyjdphj9xnj8gjb",
            Key: "competitions_y473sycnsryug46z7vbw4xhjc2238pq2nzicw5vh6h8gypgzaw.json",
            Body: dataCompetitions
        };
        await s3.upload(paramsCompetitions).promise();

    } catch (error) {
        console.error(error);
    }
})();
