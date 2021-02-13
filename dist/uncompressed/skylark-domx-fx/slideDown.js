define([
    "./fx",
    "./slide"
],function(fx,slide) {
    /*   
     * Display an element with a sliding motion.
     * @param {Object} elm  
     * @param {Number or String} duration
     * @param {Function} callback
     */
    function slideDown(elm, duration, callback) {
        return slide(elm,{
            direction : "down",
            duration : duration
        },callback);
    }

    return fx.slideDown = slideDown;
});