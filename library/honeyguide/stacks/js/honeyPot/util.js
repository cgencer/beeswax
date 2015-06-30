var honeyPot = honeyPot || {};

honeyPot.createNS = function(namespace) {
    var nsparts = namespace.split(".");
    var parent = honeyPot;

    if (nsparts[0] === "honeyPot") {
        nsparts = nsparts.slice(1);
    }
    for (var i = 0; i < nsparts.length; i++) {
        var partname = nsparts[i];
        if (typeof parent[partname] === "undefined") {
            parent[partname] = {};
        }
        parent = parent[partname];
    }
    return parent;
};

honeyPot.createNS("honeyPot.editor");
