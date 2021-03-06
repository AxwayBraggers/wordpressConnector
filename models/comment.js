/*globals require, module */

var Arrow = require('arrow');

module.exports = Arrow.Model.extend('comment', {
    fields: {
        ID: { type: Number, required: true },
        content: { type: String, required: true },
        url: { type: String, required: false },
        likes_count: { type: String },
        author: { type: String }
    },
    connector: "com.axway.wordpress.connector",
});