(function ($) {
    /* some junk text about this script */
    $.fn.dataBinding = function () {
        var valueCache = [],
            theThing = this;
        
        function updateDB(endpoint, data, callback) {
            // upstream
            if (endpoint && data) {
                $.ajax({
                    /* ... */
                    success: callback
                });
            }
        }

        function updateUI($elem) {
            // downstream (initialisation)
            $.ajax({
                /* ... */
                success: function (shittyData) {
                    $elem.val(shittyData);
                }
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
})(jQuery);
