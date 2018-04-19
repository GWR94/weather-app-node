var getUser = (id, callback) => {
	var user = {
		id: 12,
		name: 'James'
	};
	setTimeout(() => {
		callback(user);		
	}, 3000);
};

getUser(12, (user) => {
	console.log(user.name);
});