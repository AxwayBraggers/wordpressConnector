var Arrow = require('arrow'),
    _ = require('lodash'),
    request = require('request');

/**
 * Queries for particular model records.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {ArrowQueryOptions} options Query options.
 * @param {Function} callback Callback passed an Error object (or null if successful) and the model records.
 * @throws {Error} Failed to parse query options.
 */
exports.query = function (Model, options, callback) {
    // TODO: Translate the Arrow style query fields below to line up with your data store.
    var query = {
        /**
         * A dictionary of the fields to include, such as { first_name: 1 }
         */
        sel: Model.translateKeysForPayload(options.sel),
        /**
         * A dictionary of the fields to exclude, such as { last_name: 0 }
         */
        unsel: Model.translateKeysForPayload(options.unsel),
        /**
         * A dictionary of fields to search by, ignoring keys that aren't specified in our model, and including "id",
         * such as { first_name: 'Daws%', last_name: 'Toth' }
         */
        where: (typeof options.where === 'object') ? options.where : JSON.parse(options.where),
        /**
         * A dictionary of fields to order by, with a direction, such as { first_name: 1, last_name: -1 } where 1 is
         * ascending and -1 is descending.
         */
        order: Model.translateKeysForPayload(options.order),
        /**
         * A number indicating how far to skip through the results before returning them, such as 0 or 100, as well
         * as a limit on how many to return, such as 10 or 20. Alternatively, use options.page and options.per_page.
         * Arrow translates these for you.
         *
         * For example, a skip of 50 and a limit of 10 is equivalent to a page of 5 and a per_page of 10.
         */
        skip: options.skip,
        limit: options.limit,
        page: options.paget,
        tag: options.tag
    };

    switch (Model.name) {
        case 'post':
            queryPosts(query, Model, (error, data) => {
                callback(error, data);
            });
            break;
        case 'comment':
            queryComments(query, Model, (error, data) => {
                callback(error, data);
            });
            break;
        default:
            break;
    }

    // TODO: Find the matching results for this Model from your data store. 
    /* yourDataStore.query(query, function(err, results) {
    if (err) {
        return callback(err);
    }

    // TODO: Instantiate each result.
    var array = [];
    for (var c = 0; c < results.length; c++) {
        var instance = Model.instance(results[c], true);
        instance.setPrimaryKey(String(results[c].id));
        array.push(instance);
    }
    // TODO: Turn the array of instances in to a collection.
    callback(null, new Arrow.Collection(Model, array));
    });*/
};

function queryPosts(query, Model, callback) {
    var connector = Model.getConnector(),
        config = connector.config,
        reqUri = `${config.wordpressApiUrl}sites/${config.blogId}/posts`;
    //query?limit=10&skip=0&where=undefined&order=undefined&sel=undefined&unsel=undefined&page=1&per_page=10

    var options = {
        url: reqUri,
        qs: {
            number: query.limit
        },
        "method": "GET",
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'
        }
    };

    request(options, function (err, response, body) {
        if (typeof body === "undefined") {
            callback(new ORMError("404 - Nothing found!"));
        }
        if (typeof body !== "object") {
            body = JSON.parse(body);
        }

        var modelData = body.posts;
        console.log(query);

        if (!err) {
            var modelInstances = multipleToCollection(modelData, Model);
            //var instance = Model.instance(modelData, true);
            //instance.setPrimaryKey(String(modelData.ID));

            //callback(null, instance);
            callback(null, new Arrow.Collection(Model, modelInstances));
        }
    })
}

function queryComments(query, Model, callback) {
    if (typeof query.where.postId === "undefined")
        callback("Where postId should be supplied");

    var cnnctr = Model.getConnector(),
        config = cnnctr.config,
        reqUri = `${config.wordpressApiUrl}sites/120312210/posts/${query.where.postId}/replies`;

    var options = {
        "url": reqUri,
        "method": "GET",
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'
        }
    };

    request(options, function (err, response, body) {
        if (typeof body === "undefined") {
            callback(new ORMError("404 - Nothing found!"));
        }
        if (typeof body !== "object") {
            body = JSON.parse(body);
        }
        var modelData = body.comments;

        if (!err) {
            var modelInstances = multipleToCollection(modelData, Model);
            // callback(null, instance);
            callback(null, new Arrow.Collection(Model, modelInstances))
        } else {
            callback(new ORMError("Error: Could not delete post!"));
        }
    });
}

function multipleToCollection(data, Model) {
    if (data.length < 1)
        return [];
    instanceArray = [];
    for (var i = 0; i < data.length; i++) {
        var instance = Model.instance(data[i], true);

        console.log(instance);
        instance.setPrimaryKey(String(data[i].ID));
        instanceArray.push(instance);
    }
    return instanceArray;
}