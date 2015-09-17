module.exports.remote = {
	user: process.env.DB_USER || 'foobar',
	password: process.env.DB_PASSWORD || 'w6QP*dc5',
	server: process.env.DB_SERVER || 'ds027779.mongolab.com',
	port:process.env.DB_PORT || '27779',
	database:process.env.DB_NAME || 'sandbox'
};

module.exports.local = {
	server: process.env.DB_SERVER || 'localhost',
	port:process.env.DB_PORT || '27017',
	database:process.env.DB_NAME || 'sandbox'
};
