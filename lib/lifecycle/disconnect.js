// TODO: Reference the module to connect to your data store.
var yourDataStore = /*require('your-data-store')*/{};

/**
 * Disconnects from your data store.
 * @param next
 */
exports.disconnect = function (next) {
	// Note: Our current context, aka "this", is a reference to your connector.
	var self = this;
	console.log('Bye, Bye!!!');
	next();
};
