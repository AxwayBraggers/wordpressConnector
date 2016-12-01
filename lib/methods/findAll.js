/*globals require, exports */
var Arrow = require('arrow'),
	ORMError = Arrow.ORMError,
	request = require('request');

/**
 * Finds all model instances.  A maximum of 1000 models are returned.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {Function} callback Callback passed an Error object (or null if successful) and the models.
 */
exports.findAll = function findAll(Model, callback) {
	var cnnctr = Model.getConnector(),
		config = cnnctr.config,
		modelName = Model.plural,
		reqUri = `${config.wordpressApiUrl}sites/${config.blogId}/${modelName}/`;

	var options = {
		"url": reqUri,
		"method": "GET",
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'
		}
	};


	request(options, function (err, response, body) {
		// TODO Should extract proper body information to pass it to the callback
		if (typeof body === "undefined") {
			callback(new ORMError("404 - Nothing found!"));
		}
		if (typeof body !== "object") {
			body = JSON.parse(body);
		}

		var modelData = body.posts;
		if (!err) {
			var instances = new Array();
			modelData.map(function (post, index) {
				var instance = Model.instance(post, true);
				instance.setPrimaryKey(String(post.id));
				instances.push(instance);
			});
			// Turn the array of instances in to a collection, and return it.
			callback(null, new Arrow.Collection(Model, instances));
		} else {
			callback(new ORMError("Error: Could not retrieve Object data!"));
		}
	});
};