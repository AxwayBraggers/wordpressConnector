// TODO: Reference the module to connect to your data store.
var wordpressCom = {};
/**
 * Connects to your data store; this connection can later be used by your connector's methods.
 * @param next
 */
exports.connect = function (next) {
	// Note: Our current context, aka "this", is a reference to your connector.
	var self = this;
	
	return next();
};
