const request = require('request');
const keys = require('../keys/dev');

var getWeather = (lat, lng, callback) => {
	request(
		{
			url: `https://api.darksky.net/forecast/${keys.weatherKey}/${lat},${lng}`,
			json: true,
		},
		(error, response, body) => {
			if (!error && response.statusCode === 200) {
				callback(undefined, {
					temperature: Math.round((body.currently.temperature - 32) / 1.8),
					actualTemperature: Math.round((body.currently.apparentTemperature - 32) / 1.8)
				});
			} else {
				callback('Unable to fetch weather.');
			}
		}
	);
};

module.exports.getWeather = getWeather;
