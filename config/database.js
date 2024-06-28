module.exports = function ( dataBaseType ) {
	var sequelize = new dataBaseType( process.env.DBNAME, process.env.DBUSER, process.env.DBPASS, {
		host: process.env.DBHOST,
		port: process.env.DBPORT,
		dialect: 'mysql',
		operatorsAliases: false,
		logging: false,
		pool: {
			max: 50000,
			min: 0,
			acquire: 30000,
			idle: 10000
		}
	} );

	sequelize.authenticate().then( () => {
		console.log( 'Connection has been established successfully.' );
	} ).catch( err => {
		console.error( 'Unable to connect to the database:', err );
	} );
	return sequelize;
	//End: sequelize database connection
};