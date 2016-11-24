var Arrow = require('arrow');

/**
 * Fetches metadata describing your connector's proper configuration.
 * @param next
 */
exports.fetchMetadata = function fetchMetadata(next) {
	next(null, {
		fields: [
			// TODO: Add a field for each config property and customize the type, name, and description.
			Arrow.Metadata.Text({
				name: 'apikey',
				description: 'connection url',
				required: true
			}),
			Arrow.Metadata.Text({
				name: 'apisecret',
				description: 'connection url',
				required: true
			})
			// TODO: After defining your fields, try an `appc run` to see it error!
			// TODO: Then, go update your conf/local.js and conf/example.config.js so it passes validation.
		]
	});
};
