const yargs = require('yargs');
const axios = require('axios');
const keys = require('./keys/dev');
const fs = require('fs');

const setDefault = location => {
	fs.writeFileSync('default.json', JSON.stringify(location));
};

const fetchDefault = () => {
	try {
		var defaultLocation = fs.readFileSync('default.json');
		return JSON.parse(defaultLocation);
	} catch (e) {
		return [];
	}
};

const argv = yargs
	.options({
		address: {
			alias: 'a',
			describe: 'Address to fetch weather for',
			string: true,
		},
		default: {
			alias: 'd',
			describe: 'Set the default location',
			string: true,
		},
	})
	.help()
	.alias('help', 'h').argv;

if (argv.default) {
	setDefault(argv.default);
} else {
	let encodedAddress;
	if (!argv.address) {
		encodedAddress = encodeURIComponent(fetchDefault());
	} else {
		encodedAddress = encodeURIComponent(argv.address);
	}
	var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${
		keys.googleKey
	}`;
	axios
		.get(geocodeUrl)
		.then(response => {
			if (response.data.status === 'ZERO_RESULTS') {
				throw new Error('Unable to find that address.');
			}
			var lat = response.data.results[0].geometry.location.lat;
			var lng = response.data.results[0].geometry.location.lng;
			var weatherUrl = `https://api.darksky.net/forecast/${keys.weatherKey}/${lat},${lng}`;
			console.log(response.data.results[0].formatted_address);
			return axios.get(weatherUrl);
		})
		.then(response => {
			var summary = response.data.currently.summary;
			var temperature = response.data.currently.temperature;
			var apparentTemperature = response.data.currently.apparentTemperature;
			var chanceOfRain = response.data.currently.precipProbability;
			var highToday = response.data.daily.data[0].temperatureHigh;
			var lowToday = response.data.daily.data[0].temperatureLow;
			console.log(`It is ${summary.toLowerCase()} today, with a ${chanceOfRain}% chance of rain. 
The temperature is currently ${temperature} celsius. It feels like ${apparentTemperature} celsius.
The temperature could rise to ${highToday}, with the lowest temperature being ${lowToday}`);
		})
		.catch(e => {
			if (e.code === 'ENOTFOUND') {
				console.log('Unable to connect to API servers.');
			} else {
				console.log(e.message);
			}
		});
}
