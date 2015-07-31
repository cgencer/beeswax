(function($, _, s) {
    "use strict";

    _.mixin(s.exports());
    var honeyPot = honeyPot || {};
    var exports = module.exports = {};

    var LoadedFiles = [];

    honeyPot.LoadFile = function(url) {
        var self = this;
        if (this.LoadedFiles.contains(url)) return;

        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    self.LoadedFiles.push(url);
                    self.AddScript(xhr.responseText);
                } else {
                    if (console) {
                        console.error(xhr.statusText);
                    }
                }
            }
        };
        xhr.open("GET", url, false); /*last parameter defines if call is async or not*/
        xhr.send(null);
        return module.exports;
    };

    honeyPot.AddScript = function(code) {
        var oNew = document.createElement("script");
        oNew.type = "text/javascript";
        oNew.textContent = code;
        document.getElementsByTagName("head")[0].appendChild(oNew);
    };

})(jQuery, _, s);
