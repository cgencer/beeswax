module.exports = (function($, _, s, honeyPot) {
    "use strict";

    console.log('honeyPot::: loadFile loaded');

    exports.honeyPot = _.extend(honeyPot, {

        _loadedFiles: [],
        loadFile: function(url) {
            var self = this;
            if (this.LoadedFiles.contains(url)) return;

            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        self._loadedFiles.push(url);
                        self.addScript(xhr.responseText);
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
        },

        addScript: function(code) {
            var oNew = document.createElement("script");
            oNew.type = "text/javascript";
            oNew.textContent = code;
            document.getElementsByTagName("head")[0].appendChild(oNew);
        }
    });

})(jQuery, _, s, honeyPot);