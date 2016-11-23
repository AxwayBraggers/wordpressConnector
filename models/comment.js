/*globals require, module */

var Arrow = require('arrow');

module.exports = Arrow.Model.extend('comment', {
    fields: {
        ID: { type: Number, required: true },
        content: { type: String, required: true },
        url: { type: String, required: true },
        likes_count: { type: String },
        author: { type: String }
    }
});