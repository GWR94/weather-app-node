const request = require('request');
const keys = require('../keys/dev');

var getWeather = () => {
	request(
		{
			url: `https://api.darksky.net/forecast/${keys.weatherKey}/${lat},${lng}`,
			json: true,
		},
		(error, response, body) => {
			if (!error && response.statusCode === 200) {
				console.log(body.currently.temperature);
			} else {
				console.log('Unable to fetch weather.');
			}
		}
	);
};

module.exports = {
	getWeather
}