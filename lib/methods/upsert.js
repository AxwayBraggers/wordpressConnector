var Arrow = require('arrow'),
    ORMError = Arrow.ORMError,
    request = require('request');

/**
 * Updates a model or creates the model if it cannot be found.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {String} id ID of the model to update.
 * @param {Object} doc Model attributes to set.
 * @param {Function} callback Callback passed an Error object (or null if successful) and the updated or new model.
 */
exports.upsert = function upsert(Model, id, doc, callback) {

	var ID = instance.id;
    var cnnctr = Model.getConnector(),
        config = cnnctr.config,
        options = {
            url: `${config.wordpressApiUrl}sites/120312210/posts/${id}`,
            method: "POST",
			bodyParams: {
				id: id,
				title: 'Title',
				content: 'Content'
			},
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