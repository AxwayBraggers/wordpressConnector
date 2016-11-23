var Arrow = require('arrow'),
    request = require('request');
/**
 * Deletes the model instance.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {Arrow.Instance} instance Model instance.
 * @param {Function} callback Callback passed an Error object (or null if successful), and the deleted model.
 */
exports['delete'] = function(Model, instance, callback) {

    // not sure how we wil receive id
    var options = {
        url: `https://public-api.wordpress.com/rest/v1.1/sites/120312210/posts/${id}/delete`,
        method: "DELETE",
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
            authorization: "Bearer iaNg%wcAdulcR489HW&7bz8RGOY!kOQi@z4LF3BPWZhqljheYBXVlhHUyN6!ta^#"
        }
    }

    request(options, callback);
    /*
    request(options, function (err, response, body) {
    console.log("Deleted file with id: ${id}");
});
     */
};