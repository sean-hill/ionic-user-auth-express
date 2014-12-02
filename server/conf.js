// Server Configuration

var conf = {};

// Shared configuration between dev and production
conf.joe = "HEY THERE";

// Development configuration
if (process.env.NODE_ENV === 'development') {

	conf.mongo_config = {
		'dbname' : 'base-auth-db',
		'host' : 'localhost',
		'port' : 27017,
		'auth' : {
			'name': 'XXXXXXXX',
			'pass': 'XXXXXXXX'
		},
		connect_string: function(){
			return 'mongodb://' + this.auth.name + ':' + this.auth.pass + '@' + this.host + ':' + this.port + '/' + this.dbname;
		}
	};

}

// Production configuration
if (process.env.NODE_ENV === 'production') {

	conf.mongo_config = {
		'dbname' : 'base-auth-prod',
		'host' : 'some.prod.db',
		'port' : 12345,
		'auth' : {
			'name': 'XXXXXXXX',
			'pass': 'XXXXXXXX'
		},
		connect_string: function(){
			return 'mongodb://' + this.auth.name + ':' + this.auth.pass + '@' + this.host + ':' + this.port + '/' + this.dbname;
		}
	};

}

module.exports = conf;