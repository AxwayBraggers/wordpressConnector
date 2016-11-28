var Arrow = require('arrow'),
    ORMError = Arrow.ORMError,
    request = require('request');
/**
 * Deletes the model instance.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {Arrow.Instance} instance Model instance.
 * @param {Function} callback Callback passed an Error object (or null if successful), and the deleted model.
 */
//exports.delete = function(Model, instance, callback) {
exports['delete'] = function (Model, instance, callback) {
    console.log(instance);

    var id = instance.id;
    var cnnctr = Model.getConnector(),
        config = cnnctr.config,
        options = {
           method: "DELETE",
            url:  `${config.wordpressApiUrl}sites/120312210/posts/${id}/delete`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
                authorization: "Bearer iaNg%wcAdulcR489HW&7bz8RGOY!kOQi@z4LF3BPWZhqljheYBXVlhHUyN6!ta^#"
            },
            json: true
        };

    request(options, function(err, response, body) {
        if (typeof body === "undefined") {
            callback(new ORMError("404 - Nothing found!"));
        }
        if (typeof response !== "object") {
            response = JSON.parse(body);
        }
       
        var modelData = body;

        if (!err) {
            var instance = Model.instance(modelData, true);
            //instance.setPrimaryKey(String(modelData.ID));
            callback(null, instance);
        } else {
            callback(new ORMError("Error: Could not deletSe post!"));
        }
    });
};