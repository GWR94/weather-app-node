const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

	// geocode.geocodeAddress(argv.address, (errorMessage, result) => {
	// 	if(errorMessage) {
	// 		console.log(errorMessage);
	// 	} else {
	// 		console.log(JSON.stringify(result, undefined, 2));
	// 	}
	// });

	const lat = '51.221838';
	const lng = '0.2791669';

	weather.getWeather(lat, lng, (errorMessage, result) => {
		if(errorMessage) {
			console.log(errorMessage);
		} else {
			console.log(JSON.stringify(result, undefined, 2));
		}
	});


