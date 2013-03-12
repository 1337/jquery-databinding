(function ($) {
    /* some junk text about this script */

    if (!($ && $.fn && $.fn.jquery)) {
        return;  // you did something seriously wrong
    }

    $.fn.dataBinding = function () {
        var valueCache = [],
            thePlugin = this;

        thePlugin.endpoint = thePlugin.username = thePlugin.password = '';
        
        function updateDB(endpoint, data, successCallback, errorCallback) {
            // upstream
            successCallback = successCallback || function () {};
            errorCallback = errorCallback || function () {};

            if (endpoint && data) {
                $.ajax({
                    /* ... */
                    username: thePlugin.username,
                    password: thePlugin.password,
                    cache: false,
                    success: successCallback,
                    error: errorCallback
                });
            }
        }

        function updateUI($elem, successCallback, errorCallback) {
            // downstream (initialisation)
            successCallback = successCallback || function () {};
            $.ajax({
                /* ... */
                username: thePlugin.username,
                password: thePlugin.password,
                cache: false,
                success: function (shittyData) {
                    if (!successCallback(shittyData)) {
                        // i.e. if the callback returns 0 or anything usual
                        try {
                            $elem.val(shittyData);
                        } catch (err) {
                            $elem.text(shittyData);
                        }
                    }
                },
                error: errorCallback
            });
        }

        return this.each(function () {
            var $this = $(this);
            
            updateUI($this);

            $this.blur(function () {
                var data = $this.data();

                updateDB(data.endpoint || '', 
                         $this.val() || $this.text() || '', 
                         data.successCallback || function () {},
                         data.errorCallback || function () {});
            });
        });
    };
})(window.jQuery || window.$ || {});