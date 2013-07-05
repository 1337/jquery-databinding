(function ($) {
    "use strict";
    /* some junk text about this script */

    if (!($ && $.fn && $.fn.jquery)) {
        throw "poop (no jQuery)";  // you did something seriously wrong
    }

    $.fn.dataBinding = function (options) {
        var defaults = {
                'endpoint': '',  // the REST API location
                'username': '',
                'password': ''
            },
            noop = function () {},
            valueCache = [],
            thePlugin = this,
            updateDB,
            updateUI;

        options = $.extend({}, defaults, options);
        
        updateDB = function (endpoint, data, successCallback, errorCallback) {
            // send data upstream
            successCallback = successCallback || noop;
            errorCallback = errorCallback || noop;

            if (endpoint && data) {
                $.ajax({
                    /* ... */
                    'username': options.username,
                    'password': options.password,
                    'type': 'POST',
                    'cache': false,
                    'success': successCallback,
                    'error': errorCallback
                });
            }
        };

        updateUI = function ($elem, data, successCallback, errorCallback) {
            // send data downstream (show data)
            successCallback = successCallback || noop;
            errorCallback = errorCallback || noop;
            $.ajax({
                /* ... */
                'username': data.username,
                'password': data.password,
                cache: false,
                success: function (shittyData) {
                    if (!successCallback(shittyData)) {
                        // i.e. if the callback returns 0 or anything usual
                        try {
                            $elem.val(shittyData);
                        } catch (err) {
                            $elem.text(shittyData);
                        }
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
                localTarget = $(data.endpoint);

            if (!localTarget.length) {  // thing is remote
                updateUI($this, data);

                $this.blur(function () {
                    updateDB(data.endpoint || options.endpoint || '',
                             $this.val() || $this.text() || '',
                             data.successCallback || noop,
                             data.errorCallback || noop);
                });
            } else {
                localTarget.keyup(function () {
                    $this.val(localTarget.val());
                });
            }
        });
    };
})(window.jQuery || window.$ || {});