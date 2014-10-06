// JavaScript Application Framework (jsappf) v0.3.1 alfa, http://jsappf.org/
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
        modulesPath: "app", //default directory will be 'app'
        templatesPath: "app/viewTemplates",
        templateRender: Mustache, //Default template render http://mustache.github.io/
        layoutTag: "main-content",
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
        if ($.trim(settings.templatesPath).length != 0) {
            app.settings.templatesPath = settings.templatesPath;
            app.settings.viewEngine.setTemplatePath(settings.templatesPath);
        }
        if ($.trim(settings.bodyTag).length != 0) {
            app.settings.bodyTag = settings.bodyTag;
        }
        if ($.trim(settings.layoutTag).length != 0) {
            app.settings.layoutTag = settings.layoutTag;
        }
        if ($.trim(settings.doCache).length != 0) {
            app.settings.doCache = settings.doCache;
            app.settings.viewEngine.setCache(settings.doCache);
        }
        if ($.trim(settings.version).length != 0) {
            app.version = settings.version;
            app.settings.viewEngine.setVersion(settings.version);
        }

        //Register Routes
        Path.root("#/index");
        Path.map("#/:param1(/:param2)").to(function () {
            var param1 = this.params["param1"] || "";
            var param2 = this.params["param2"] || "";
            var module = param1 + (param2 == "" ? '' : '_' + param2);
            app.loadModule(module);
        });
        Path.listen();

        // Start Application
        app.loadModule("main");
    },
    view: function (view, model) {
        var result = null;
        if (app.settings.doCache) {
            result = locache.get(app.version + "-v-" + view.viewName);
        }
        if (result == null) {
            result = app.settings.viewEngine.renderViews(view.view);
            if (app.settings.doCache) {
                locache.set(app.version + "-v-" + view.viewName, result, 3600);
            }
        }

        ko.cleanNode($('#' + app.settings.bodyTag)[0]);
        document.getElementById(app.settings.bodyTag).innerHTML = result;
        if (model != undefined)
            ko.applyBindings(model, document.getElementById(app.settings.bodyTag));
    },
    loadModule: function (module) {
        //verify that the module is not allready loaded
        var result = null;
        if (!app.modules.hasOwnProperty(module)) {
            var fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            if (result == null) {
                result = app.loadFile(module);
            }
            var t = document.createTextNode(result);
            fileref.appendChild(t);
            if (typeof fileref != "undefined") {
                document.getElementsByTagName("head")[0].appendChild(fileref);
            }
        }
        app.executeFunctionByName(module + ".code.start", app.modules);
    },
    loadFile: function (filename) {
        actualFilename = filename.replace("_","/");
        var url = app.render("{{{path}}}/{{{filename}}}.js", { filename: actualFilename, path: app.settings.modulesPath })
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