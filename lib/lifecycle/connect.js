/**
 * Connects to your data store; this connection can later be used by your connector's methods.
 * @param next
 */
exports.connect = function (next) {
    // Note: Our current context, aka "this", is a reference to your connector.
    var self = this,
        config = this.config;
        
    this.access_token = config.accessToken;

    var data = {
        "access_token": config.accessToken,
        "token_type": "bearer",
        "blog_id": config.blogId,
        "blog_url": config.blogUrl,
        "scope": ""
    };
    
    this.api_data = data;
    next();
};