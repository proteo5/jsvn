// JavaScript Application Framework (jsappf) v0.4.0 alfa, http://jsappf.org/
//
// <copyright file="JSappf.js" company="Alfredo Pinto Molina">
//      Copyright (c) 2014 All Right Reserved
//      License: BSD 3 Clause (http://opensource.org/licenses/BSD-3-Clause)
// </copyright>
// <author>Alfredo Pinto Molina</author>
// <email></email>
// <date>2014-10-29</date>
// <summary></summary>
var contador = 0;
var app = {
    settings: {
        modulesPath: "modules", //default directory will be 'app'
        viewsPath: "views",
        templateRender: Mustache, //Default template render http://mustache.github.io/
        bodyTag: "main-body",
        viewEngine: jsvn,
        doCache: true
    },
    //Method to render templates
    render: function (template, data) {
        return app.settings.templateRender.render(template, data);
    },
    modules: {},
    start: function (settings) {
        //set Seetings
        if ($.trim(settings.modulesPath).length != 0) {
            app.settings.modulesPath = settings.modulesPath;
        }

        if ($.trim(settings.viewsPath).length != 0) {
            app.settings.viewsPath = settings.viewsPath;
        }

        if ($.trim(settings.bodyTag).length != 0) {
            app.settings.bodyTag = settings.bodyTag;
        }

        if ($.trim(settings.doCache).length != 0) {
            app.settings.doCache = settings.doCache;
        }

        if ($.trim(settings.version).length != 0) {
            app.version = settings.version;
        }

        //Set view engine settings
        app.settings.viewEngine.setVersion(app.version);
        app.settings.viewEngine.setViewsPath(app.settings.viewsPath);
        app.settings.viewEngine.setCache(app.settings.doCache);

        //Register Routes
        Path.root("#/index");
        Path.map("#/:param1(/:param2)").to(function () {
            var param1 = this.params["param1"] || "";
            var param2 = this.params["param2"] || "";
            var module = param1 + (param2 == "" ? '' : '_' + param2);
            app.loadModule(module);
        });

        // Start Application
        app.loadModule("main");

        //Set localization
        var localization = locache.get(app.version + "-localization");
        if (localization == null) {
            var browserLocalization = window.navigator.userLanguage || window.navigator.language;
            localization = app.settings.supportedLocalization.indexOf(browserLocalization) == -1 ? app.settings.defaultLocalization : browserLocalization;
            app.setLocalization(localization);
        }
        app.settings.viewEngine.settings.localization = localization;

        //start routing.
        Path.listen();
    },
    setLocalization: function (localization) {
        console.log("set localization", localization);
        locache.set(app.version + "-localization", localization);
        app.settings.viewEngine.settings.localization = localization;
        //Core.push('localization', localization);
    },
    view: function (data) {
        //console.log("caller is ", printStackTrace().join('\n\n'));
        var result = null;
        if (app.settings.doCache) {
            result = locache.get(app.version + "-v-" + data.view.viewName);
        }
        if (result == null) {
            result = app.settings.viewEngine.getViewHTML(data.view, data.resources);
            if (app.settings.doCache) {
                locache.set(app.version + "-v-" + data.view.viewName, result, 3600);
            }
        }

        if (data.model != undefined) {
            data.modelPlace = data.modelPlace == undefined ? data.place : data.modelPlace;
            ko.cleanNode($('#' + data.modelPlace)[0]);
        }
        document.getElementById(data.place).innerHTML = result;
        if (data.model != undefined) {
            ko.applyBindings(data.model, document.getElementById(data.modelPlace));
        }
    },
    loadModule: function (module) {
        //verify that the module is not allready loaded
        var result = null;
        if (!app.modules.hasOwnProperty(module)) {
            var fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            if (result == null) {
                var path = module == 'main' ? "" : app.settings.modulesPath + "/";
                result = app.loadFile(path, module + ".js");
            }
            var t = document.createTextNode(result);
            fileref.appendChild(t);
            if (typeof fileref != "undefined") {
                document.getElementsByTagName("head")[0].appendChild(fileref);
            }
        }
        app.executeFunctionByName(module + ".code.start", app.modules);
    },
    loadFile: function (path, filename) {
        actualFilename = filename.replace("_", "/");
        var file = '';
        var url = app.render("{{{path}}}{{{filename}}}", { filename: actualFilename, path: path })
        var result = $.ajax({
            type: "GET",
            url: url,
            async: false
        });

        if (result.status == 200 || result.status == 304) {
            file = result.responseText;
        }
        return file;
    },
    executeFunctionByName: function (functionName, context /*, args */) {
        var args = Array.prototype.slice.call(arguments, 2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(context, args);
    }
}