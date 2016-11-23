/**
 * Connects to your data store; this connection can later be used by your connector's methods.
 * @param next
 */
exports.connect = function(next) {
    // Note: Our current context, aka "this", is a reference to your connector.
    var self = this;

    // self.ac_token = "iaNg%wcAdulcR489HW&7bz8RGOY!kOQi@z4LF3BPWZhqljheYBXVlhHUyN6!ta^#";
    this.access_token = "iaNg%wcAdulcR489HW&7bz8RGOY!kOQi@z4LF3BPWZhqljheYBXVlhHUyN6!ta^#";

    var data = {
        "access_token": "iaNg%wcAdulcR489HW&7bz8RGOY!kOQi@z4LF3BPWZhqljheYBXVlhHUyN6!ta^#",
        "token_type": "bearer",
        "blog_id": "120312210",
        "blog_url": "http://marinvasilevblog.wordpress.com",
        "scope": ""
    }

    // self.api_data = data;
    this.api_data = data;

    next();
};