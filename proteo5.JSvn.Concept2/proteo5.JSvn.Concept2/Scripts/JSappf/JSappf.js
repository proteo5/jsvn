// JavaScript Application Framework (jsappf) v0.1.0 alfa, http://jsappf.org/
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
        viewEngine: jsvn
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
            app.settings.viewEngine.settings.templatesPath = settings.templatesPath;
        }
        if ($.trim(settings.bodyTag).length != 0) {
            app.settings.bodyTag = settings.bodyTag;
        }
        if ($.trim(settings.layoutTag).length != 0) {
            app.settings.layoutTag = settings.layoutTag;
        }

        app.loadModule("main");
    },
    view: function (view) {
        var html = app.settings.viewEngine.renderViews(view);
        $("#" + app.settings.bodyTag).html(html);
    },
    loadModule: function (module) {
        //verify that the module is not allready loaded
        if (!app.modules.hasOwnProperty(module)) {
            // load module
            var file = app.render("{{{path}}}/{{{module}}}.js", { module: module, path: app.settings.modulesPath });
            app.loadFile(file, "js");
        }
    },
    loadFile: function (filename, filetype) {
        // thanks to http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml
        if (filetype == "js") { //if filename is a external JavaScript file
            var fileref = document.createElement('script')
            fileref.setAttribute("type", "text/javascript")
            fileref.setAttribute("src", filename)
        }
        else if (filetype == "css") { //if filename is an external CSS file
            var fileref = document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("type", "text/css")
            fileref.setAttribute("href", filename)
        }
        if (typeof fileref != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(fileref)
        }
    }
}