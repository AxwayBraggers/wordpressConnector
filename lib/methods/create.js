var Arrow = require('arrow'),
	ORMError = Arrow.ORMError,
	request = require('request');

/**
 * Creates a new Model or Collection object.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {Array<Object>/Object} [values] Attributes to set on the new model(s).
 * @param {Function} callback Callback passed an Error object (or null if successful), and the new model or collection.
 * @throws {Error}
 */
exports.create = function (Model, values, callback) {

	var instance = Model.instance(values, true);
	var cnnctr = Model.getConnector(),
		config = cnnctr.config;
	var options = {
		url: `${config.wordpressApiUrl}sites/120312210/posts/new`,
		method: "POST",
		bodyParams: {
			ID: instance.setPrimaryKey(String(values.ID)),
			title: 'Title',
			content: 'Content'
		},
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
			authorization: "Bearer iaNg%wcAdulcR489HW&7bz8RGOY!kOQi@z4LF3BPWZhqljheYBXVlhHUyN6!ta^#"
		},
		json: true,
		gzip: true
	};

	request(options, function (err, response, body) {
		if (!err) {
			callback(null, instance);
		} else {
			callback(new ORMError("Error: Could not create new post!"));
		}
	});
};
