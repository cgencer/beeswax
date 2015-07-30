var _rmod = _rmod || {}; //require module namespace
honeyPot._rmod.LOADED = false;
honeyPot._rmod.on_ready_fn_stack = [];
honeyPot._rmod.libpath = '';
honeyPot._rmod.imported = {};
honeyPot._rmod.loading = {
    scripts: {},
    length: 0
};

honeyPot._rmod.findScriptPath = function(script_name) {
    var script_elems = document.getElementsByTagName('script');
    for (var i = 0; i < script_elems.length; i++) {
        if (script_elems[i].src.endsWith(script_name)) {
            var href = window.location.href;
            href = href.substring(0, href.lastIndexOf('/'));
            var url = script_elems[i].src.substring(0, script_elems[i].length-script_name.length);
            return url.substring(href.length+1, url.length);
        }
    }
    return '';
};

honeyPot._rmod.libpath = honeyPot._rmod.findScriptPath('script.js'); //Path of your main script used to mark the root directory of your library, any library


honeyPot._rmod.injectScript = function(script_name, uri, callback, prepare, async) {
    
    if(!prepare)
        prepare(script_name, uri);
    
    var script_elem = document.createElement('script');
    script_elem.type = 'text/javascript';
    script_elem.title = script_name;
    script_elem.src = uri;
    if(!async)
        async = false;
    script_elem.async = async;
    script_elem.defer = false;
    
    if(!callback)
        script_elem.onload = function() {
            callback(script_name, uri);
        };
    
    document.getElementsByTagName('head')[0].appendChild(script_elem);
};

honeyPot._rmod.requirePrepare = function(script_name, uri) {
    honeyPot._rmod.loading.scripts[script_name] = uri;
    honeyPot._rmod.loading.length++;
};

honeyPot._rmod.requireCallback = function(script_name, uri) {
    honeyPot._rmod.loading.length--;
    delete honeyPot._rmod.loading.scripts[script_name];
    honeyPot._rmod.imported[script_name] = uri;

    if(honeyPot._rmod.loading.length == 0)
        honeyPot._rmod.onReady();
};

honeyPot._rmod.onReady = function() {
    if (!honeyPot._rmod.LOADED) {
        for (var i = 0; i < honeyPot._rmod.on_ready_fn_stack.length; i++){
            honeyPot._rmod.on_ready_fn_stack[i]();
        });
        honeyPot._rmod.LOADED = true;
    }
};

_.rmod = namespaceToUri = function(script_name, url) {
    var np = script_name.split('.');
    if (np.getLast() === '*') {
        np.pop();
        np.push('_all');
    } else if (np.getLast() === 'js') {
        np.pop();
    }
    
    if(!url)
        url = '';
        
    script_name = np.join('.');
    return  url + np.join('/')+'.js';
};

//you can rename based on your liking. I chose require, but it can be called include or anything else that is easy for you to remember or write, except import because it is reserved for future use.
honeyPot.require = function(script_name, async) {
    var uri = '';
    if (script_name.indexOf('/') > -1) {
        uri = script_name;
        var lastSlash = uri.lastIndexOf('/');
        script_name = uri.substring(lastSlash+1, uri.length);
    } else {
        uri = honeyPot._rmod.namespaceToUri(script_name, ivar._private.libpath);
    }

    if (!honeyPot._rmod.loading.scripts.hasOwnProperty(script_name) 
     && !honeyPot._rmod.imported.hasOwnProperty(script_name)) {
        honeyPot._rmod.injectScript(script_name, uri, 
            honeyPot._rmod.requireCallback, 
                honeyPot._rmod.requirePrepare, async);
    }
};

var ready = function(fn) {
    honeyPot._rmod.on_ready_fn_stack.push(fn);
};
