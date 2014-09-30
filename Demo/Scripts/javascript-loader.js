// Set the lib you want to get, and the necessary file paths required
var libsRepository = {
    "threejs": [
        "//cdnjs.cloudflare.com/ajax/libs/three.js/r61/three.js"
    ],
    "tinymce": [
        "//tinymce.cachefly.net/4.0/tinymce.min.js"
    ]
};

var registeredLibs = {};

//Main function
//I.E. registerLib("threejs",function(){console.log(THREE)})
function registerLib(libName, callback) {
    var libs = libName.split(",");

    if (libs.length > 1) {
        loadLib(libs[0], function () {
            libs.shift();
            libs = libs.join(",");
            registerLib(libs, callback);
        });
    } else {
        loadLib(libs[0], callback);
    }
}

function loadLib(libName, callback) {
    if (!registeredLibs[libName]) {
        var currentLibFiles = libsRepository[libName];

        registeredLibs[libName] = {
            loaded: false,
            filesLoaded: 0,
            files: currentLibFiles,
            callback: callback
        };

        loadLibFile(currentLibFiles, libName);
    } else {
        if (registeredLibs[libName].loaded) {
            callback();
        }
    }
}

function loadLibFile(files, libName) {

    if (files.length > 0) {
        var file = files[0];

        if (file.indexOf(".css") !== -1) {

            loadCSS(file);
            preloadFile(files, libName)

        } else {

            $.getScript(file)
            .done(function () {
                preloadFile(files, libName);
            })
            .error(function (error) {
                console.error("Error loading libraries", error);
            })

        }
    }
}

function preloadFile(files, libName) {
    registeredLibs[libName].filesLoaded++;

    if (files.length == 1) {
        libLoaded(registeredLibs[libName]);
    } else {
        files.shift();
        loadLibFile(files);
    }
}

function libLoaded(registeredLib) {
    registeredLib.loaded = true;
    registeredLib.callback();
}

function loadCSS(path) {
    var cssLink = $("<link>");
    $("head").append(cssLink); //IE hack: append before setting href

    cssLink.attr({
        rel: "stylesheet",
        type: "text/css",
        href: path
    });
};