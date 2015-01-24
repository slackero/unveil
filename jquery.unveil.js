/*!
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 *
 * Extended 2015 by Oliver Georgi
 * http://github.com/slackero
 * - Use options to init unveil({})
 * - src can be used to unveil images
 */

;(function($) {

    $.fn.unveil = function(options) {

        var $w = $(window),
            retina = window.devicePixelRatio > 1,
            attrib = retina ? "data-src-retina" : "data-src",
            images = this,
            loaded,
            settings = {
                threshold: 0,
                src: false,
                callback: null,
                placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", // transparent GIF image
                autoheight: true
            };

        if (options) {
            $.extend(settings, options);
        }

        this.one("unveil", function() {
            var source = this.getAttribute(attrib);
            source = source || this.getAttribute("data-src");
            if (source) {
                this.setAttribute("src", source);
                if (settings.src && settings.autoheight) {
                    var restore = this.getAttribute('data-unveil-placeholder');
                    if (restore !== null) {
                        this.style.maxHeight = restore;
                        this.removeAttribute('data-unveil-placeholder');
                    }
                }
                if (typeof settings.callback === "function") {
                    settings.callback.call(this);
                }
            }
        });

        function unveil_placeholder() {
            var imgsrc = this.getAttribute('src');
            this.setAttribute("data-src", imgsrc);
            this.setAttribute("src", settings.placeholder);
            if (settings.autoheight) {
                var srcwidth = this.getAttribute('width'),
                    srcheight = this.getAttribute('height');
                if (srcwidth && srcheight) {
                    var $this = $(this);
                    var curwidth = $this.width();
                    if (curwidth) {
                        this.setAttribute('data-unveil-placeholder', $this.css('max-height')); // store for resetting
                        $this.css('max-height', srcheight * curwidth / srcwidth);
                    }
                }
            }
        }

        function unveil() {
            var inview = images.filter(function() {
                var $e = $(this);
                if ($e.is(":hidden")) {
                    return;
                }
                var wt = $w.scrollTop(),
                    wb = wt + $w.height(),
                    et = $e.offset().top,
                    eb = et + $e.height();

                return eb >= wt - settings.threshold && et <= wb + settings.threshold;
            });

            loaded = inview.trigger("unveil");
            images = images.not(loaded);
        }

        if (settings.src && settings.placeholder) {
            this.each(unveil_placeholder);
        }

        $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);

        unveil();

        return this;

    };

})(window.jQuery || window.Zepto);
