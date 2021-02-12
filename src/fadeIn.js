define([
    "skylark-langx/langx",
    "skylark-domx-styler",
    "./fx",
    "./fadeTo"
],function(langx,styler,fx,fadeTo) {
    /*   
     * Display an element by fading them to opaque.
     * @param {Object} elm  
     * @param {Number or String} speed
     * @param {String} easing
     * @param {Function} callback
     */
    function fadeIn(elm, speed, easing, callback) {
        var target = styler.css(elm, "opacity");
        if (target > 0) {
            styler.css(elm, "opacity", 0);
        } else {
            target = 1;
        }
        styler.show(elm);

        fadeTo(elm, speed, target, easing, callback);

        return this;
    }


    return fx.fadeIn = fadeIn;
});