/*globals require, module */

var Arrow = require('arrow');

module.exports = Arrow.Model.extend('post', {
    fields: {
        ID: { type: Number, required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        excerpt: { type: String, required: true },
        date: { type: String, required: true },
        url: { type: String, required: true },
        image_url: { type: String }, // Url to image if there is one in the post
        likes_count: { type: String },
        comment_count: { type: String },
        discussion: {type: Object},
        like_count: {type: Number},
        featured_image: {type: String}
    },
    connector: "com.axway.wordpress.connector"
});