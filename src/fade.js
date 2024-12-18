define([
    "skylark-langx/langx",
    "skylark-domx-styler",
    "./transits",
    "./transit"
],function(langx,styler,transits,transit) {
    /*   
     * Adjust the opacity of an element.
     * @param {Object} elm  
     * @param {Number or String} opacity
     * @param {Number or String} duration
     * @param {String} easing
     * @param {Function} callback
     */
    function fade(elm, opacity,duration,easing, callback) {
        ///if (langx.isFunction(options)) {
        ///    callback = options;
        ///    options = {};
        ///}
        ///options = options || {};
        
        transit(elm, { opacity: opacity }, duration, easing, callback);
        return this;
    }


    return transits.fade = fade;
});