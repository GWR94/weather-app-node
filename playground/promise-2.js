var request = require('request');
var keys = require('../keys/dev');

var geocodeAddress = address => {	
	return new Promise((resolve, reject) => {
		var address = encodeURIComponent(address);
		request(
			{
				url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${keys.googleKey}`,
				json: true,
			},
			(error, response, body) => {
				if (error) {
					reject('Unable to connect to Google servers.');
				} else if (body.status === 'ZERO_RESULTS') {
					reject('Unable to retrieve information from that address.');
				} else if (body.status === 'OK') {
					resolve({
						address: body.results[0].formatted_address,
						latitude: body.results[0].geometry.location.lat,
						longitude: body.results[0].geometry.location.lng,
					});
				}
			}
		);
	});
};

geocodeAddress('32 Ashden Walk').then(
	location => {
		console.log(JSON.stringify(location, undefined, 2));
	},
	e => {
		console.log(e);
	}
);
