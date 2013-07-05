(function ($) {
    "use strict";
    /* some junk text about this script */

    if (!($ && $.fn && $.fn.jquery)) {
        throw "poop (no jQuery)";  // you did something seriously wrong
    }

    $.fn.dataBinding = function (options) {
        var noop = function () {},
            defaults = {
                'endpoint': '',  // the REST API location
                'username': '',
                'password': '',
                'successCallback': noop,
                'errorCallback': noop
            },
            valueCache = [],
            thePlugin = this,
            updateDB,
            updateUI;

        options = $.extend({}, defaults, options);
        
        updateDB = function ($elem, data) {
            // send data upstream
            $.ajax({
                /* ... */
                'username': data.username,
                'password': data.password,
                'data': data,  // TODO
                'type': 'POST',
                'cache': false,
                'success': data.successCallback,
                'error': data.errorCallback
            });
        };

        updateUI = function ($elem, data, successCallback, errorCallback) {
            // send data downstream (show data)
            $.ajax({
                /* ... */
                'username': data.username,
                'password': data.password,
                'data': data,  // TODO
                cache: false,
                success: function (shittyData) {
                    if (!successCallback(shittyData)) {
                        // i.e. if the callback returns 0 or anything usual
                        $elem.html(shittyData);
                    } else {
                        errorCallback();
                    }
                },
                error: errorCallback
            });
        };

        return this.each(function () {
            var $this = $(this),
                data = $.extend({}, options, $this.data()),
                localTarget = [/* .length === 0 */];

            if (data.endpoint.indexOf('/') === -1) {  // i.e. can't be a url
                // odd, this can be multiple objects
                localTarget = $(data.endpoint);
            }

            if (!localTarget.length) {  // thing is remote
                updateUI($this, data);

                $this.keyup(function () {
                    updateDB(data);
                });
            } else {
                localTarget.keyup(function () {
                    $this.html(localTarget.html());
                });
            }
        });
    };
})(window.jQuery || window.$ || {});