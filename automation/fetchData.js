const fs = require('fs');
const axios = require('axios');

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

        // Guarda el archivo en la carpeta public
        fs.writeFileSync('./public/events_y473sycnsryug46z7vbw4xhjc2238pq2nzicw5vh6h8gypgzaw.json', data);

        console.log('File saved to public folder');

    } catch (error) {
        console.error(error);
    }
})();
