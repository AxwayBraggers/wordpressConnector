<<<<<<< HEAD
// TODO: Reference the module to connect to your data store.
var yourDataStore = /*require('your-data-store')*/{};
=======
var Arrow = require('arrow'),
    ORMError = Arrow.ORMError,
    request = require('request');
>>>>>>> development

/**
 * Updates a model or creates the model if it cannot be found.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {String} id ID of the model to update.
 * @param {Object} doc Model attributes to set.
 * @param {Function} callback Callback passed an Error object (or null if successful) and the updated or new model.
 */
exports.upsert = function upsert(Model, id, doc, callback) {

<<<<<<< HEAD
	// TODO: Upsert the instance in your backing data store.
	yourDataStore.upsert(id, doc, function (err, result) {
		if (err) {
			return callback(err);
		}

		// TODO: Otherwise, if all went well:
		var instance = Model.instance(result, true);
		instance.setPrimaryKey(String(result.id)); // Note: the primary key can be a number, too.
		callback(null, instance);
	});
};
=======
	var id = instance.id;
    var cnnctr = Model.getConnector(),
        config = cnnctr.config,
		modelName = Model.plural;
    
    switch (Model.name) {
		case 'post':
			var data = {
				id: id,
                title: 'Title',
                content: 'Content'
			};
		case 'comment':
			var data = {
				id: id,
                content: 'Content'
			};
		default:
			break;
	}

    var options = {
        url: `${config.wordpressApiUrl}sites/120312210/${modelName}/${id}`,
        method: "POST",
        bodyParams: data,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
            authorization: "Bearer iaNg%wcAdulcR489HW&7bz8RGOY!kOQi@z4LF3BPWZhqljheYBXVlhHUyN6!ta^#"
        }
    };

    request(options, function (err, response, body) {
        if (!err) {
            callback(null, instance);
        } else {
            callback(new ORMError("Error: Could not update post!"));
        }
    });
};
>>>>>>> development
