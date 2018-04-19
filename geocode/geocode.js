const request = require('request');
const keys = require('../keys/dev');

	const geocodeAddress = (address, callback) => {
	
		var address = encodeURIComponent(address);

		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${keys.googleKey}`,
			json: true
		}, (error, response, body) => {
			if(error) {
				callback('Unable to connect to Google servers.');
			} else if(body.status==='ZERO_RESULTS') {
				callback('Unable to retrieve information from that address.');
			} else if(body.status==='OK') {
				callback(undefined, {
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng
				});
			};
		});
	};

module.exports = {
	geocodeAddress
}