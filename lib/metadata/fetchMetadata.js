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
				name: 'wordpressApiUrl',
				description: 'wordpress API url',
				required: true
			}),
			Arrow.Metadata.Text({
				name: 'accessToken',
				description: 'Access token returned by Wordpress',
				required: true
			}),
			Arrow.Metadata.Text({
				name: 'blogId',
				description: 'BlogId you wish to work on',
				required: true
			}),
			Arrow.Metadata.Text({
				name: 'blogUrl',
				description: 'The url of the blog',
				required: true
			}),
			// TODO: After defining your fields, try an `appc run` to see it error!
			// TODO: Then, go update your conf/local.js and conf/example.config.js so it passes validation.
		]
	});
};
