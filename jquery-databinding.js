(function ($) {
    /* some junk text about this script */
    $.fn.dataBinding = function () {
        var theThing = this;
        
        function update(endpoint, data, callback) {
            if (endpoint && data) {
                $.ajax( /* ... */);
            }
        }

        return this.each(function () {
            var $this = $(this);
            $this.blur(function () {
                var data = $this.data();

                update(data.endpoint || '', 
                       $this.val() || $this.text() || '', 
                       data.callback || function () {});
            });
        });
    };
})(jQuery);
