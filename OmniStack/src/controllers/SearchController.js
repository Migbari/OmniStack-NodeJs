const Dev = require('../models/Dev')
const parseStringAsArray = require('../uteis/parseStringAsArray')

module.exports = {
    async index (request, response) {
        // Buscar todos os devs num raio 10km
        // Filtrar por tecnologias

        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

       const devs = await devs.find({
           techs: {
             $in: techsArray,
           },
           location: {
             $near: {
                 $geometry: {
                     type: 'Point',
                     coordinates: [longitude, latitude],
                 },
                 $maxDistance: 10000,
             },
           },
       });

        return response.json({ devs });
    }
}