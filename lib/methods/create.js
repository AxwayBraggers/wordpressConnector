<<<<<<< HEAD
var request = require('request');
// TODO: Reference the module to connect to your data store.
var yourDataStore = /*require('your-data-store')*/{};
=======
var Arrow = require('arrow'),
	ORMError = Arrow.ORMError,
	request = require('request');
>>>>>>> development

/**
 * Creates a new Model or Collection object.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {Array<Object>/Object} [values] Attributes to set on the new model(s).
 * @param {Function} callback Callback passed an Error object (or null if successful), and the new model or collection.
 * @throws {Error}
 */
exports.create = function (Model, values, callback) {

<<<<<<< HEAD
	request('https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/?number=2', (error, response, body) => {
		if(error){
			console.log('error >>' , error);
			callback(error);
		}

		console.log('BODY >>>', body);

		
	})

	var instance = Model.instance(values, false), // ... "instance" is an instance of the Model...
		payload = instance.toPayload(); // ... and "payload" is the translated raw values, based on field names.

	// TODO: Create the instance in your backing data store.
	yourDataStore.create(payload, function (err, result) {
		// If an error is hit:
		if (err) {
			return callback(err);
		}

		// If nothing was created by this request:
		if (!result) {
			return callback();
		}

		// TODO: Otherwise, if all went well:
		var instance = Model.instance(result, true);
		instance.setPrimaryKey(String(result._id)); // Note: the primary key can be a number, too.
		callback(null, instance);
=======
	var instance = Model.instance(values, true);
	var cnnctr = Model.getConnector(),
		config = cnnctr.config,
		modelName = Model.plural;
		
	switch (Model.name) {
		case 'post':
			var data = {
				ID: instance.setPrimaryKey(String(values.ID)),
				title: 'Title',
				content: 'Content'
			};
		case 'comment':
			var data = {
				ID: instance.setPrimaryKey(String(values.ID)),
				content: 'Content'
			};
		default:
			break;
	}

	var options = {
		url: `${config.wordpressApiUrl}sites/120312210/${modelName}/new`,
		method: "POST",
		bodyParams: data,
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
>>>>>>> development
	});
};
