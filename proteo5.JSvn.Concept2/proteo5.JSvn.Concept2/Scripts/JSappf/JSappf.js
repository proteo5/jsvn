// JavaScript Application Framework (jsappf) v0.3.0 alfa, http://jsappf.org/
//
// <copyright file="JSappf.js" company="Alfredo Pinto Molina">
//      Copyright (c) 2014 All Right Reserved
//      License: BSD 3 Clause (http://opensource.org/licenses/BSD-3-Clause)
// </copyright>
// <author>Alfredo Pinto Molina</author>
// <email></email>
// <date>2014-10-29</date>
// <summary></summary>

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

        app.loadModule("main");
    },
    view: function (view) {
        var result = null;
        if (app.settings.doCache) {
            result = locache.get(app.version + "-v-" + view.viewName)
        }
        if (result == null) {
            result = app.settings.viewEngine.renderViews(view.view);
            locache.set(app.version + "-v-" + view.viewName, result, 3600)
        }
        $("#" + app.settings.bodyTag).html(result);
    },
    loadModule: function (module) {
        //verify that the module is not allready loaded
        var result = null;
        if (!app.modules.hasOwnProperty(module)) {
            var fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            if (app.settings.doCache) {
                result = locache.get(app.version + "-m-" + module)
            }
            if (result == null) {
                result = app.loadFile(module);
                locache.set(app.version + "-m-" + module, result, 3600)
            }
            var t = document.createTextNode(result);
            fileref.appendChild(t);
            if (typeof fileref != "undefined") {
                document.getElementsByTagName("head")[0].appendChild(fileref)
            }
        }
    },
    loadFile: function (filename) {
        var url = app.render("{{{path}}}/{{{filename}}}.js", { filename: filename, path: app.settings.modulesPath })
        var file = "console.log('Module nof found')";
        var result = $.ajax({
            type: "GET",
            url: url,
            async: false
        });

        if (result.status == 200 || result.status == 304) {
            file = result.responseText;
        }
        return file;
    }
}