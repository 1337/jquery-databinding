(function ($) {
    /* some junk text about this script */
    $.fn.dataBinding = function () {
        var valueCache = [],
            theThing = this;

        theThing.endpoint = theThing.username = theThing.password = '';
        
        function updateDB(endpoint, data, callback, errorCallback) {
            // upstream
            callback = callback || function () {};
            errorCallback = errorCallback || function () {};

            if (endpoint && data) {
                $.ajax({
                    /* ... */
                    username: theThing.username,
                    password: theThing.password,
                    cache: false,
                    success: callback,
                    error: errorCallback
                });
            }
        }

        function updateUI($elem, successCallback, errorCallback) {
            // downstream (initialisation)
            successCallback = successCallback || function () {};
            $.ajax({
                /* ... */
                username: theThing.username,
                password: theThing.password,
                cache: false,
                success: function (shittyData) {
                    successCallback(shittyData) && $elem.val(shittyData);
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
                         data.callback || function () {});
            });
        });
    };
})(window.jQuery || jQuery | $);