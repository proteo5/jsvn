
$(document).ready(function () {
    app.start();
});

var app = {
    doCache: false,
    modulesPath: "app",
    porletsLoaded: [],
    modules: {},
    modulesLoaded: [],
    start: function () {
        app.loadModule("main");
    },
    render: function (template, data) {
        return Mustache.render(template, data);
    },
    renderModule: function (html) {
        var finalContent = "";
        $.each(html, function (i, item) {
            finalContent = finalContent + app.renderPorlet(item);
        });
        $('#main-content').append(finalContent);
    },
    loadModule: function (module) {
        var doLoadFile = true;
        $.each(app.modulesLoaded, function (i, item) {
            if (item == module)
                doLoadFile = false;
        });

        if (doLoadFile) {
            var file = app.render("{{{path}}}/{{{module}}}.js", { module: module, path: app.modulesPath });
            app.loadFile(file, "js");
            app.modulesLoaded.push(module);
        }
    },
    renderContent: function (content) {
        var finalContent = "";
        $.each(content, function (i, item) {
            finalContent = finalContent + app.renderPorlet(item);
        });
        return finalContent;
    },
    renderPorlet: function (porlet) {
        var hasId = false;
        var hasContent = true;
        console.log("porlet", porlet);
        $.each(porlet, function (i, item) {
            console.log(i, item);
            if (i == "id") {
                hasId = true;
            }
            if (i == "content" && typeof item == "string") {
                hasContent = false;
            }
        });
        if (hasContent) {
            porlet.content = app.renderContent(porlet.content);
        }
        porlet.hasId = hasId;
        var template = app.loadPorlet(porlet.type);
        var rendered = app.render(template, porlet);
        return rendered;
    },
    loadPorlet: function (porlet) {
        var doLoadFile = true;
        var result = null;
        console.log("porletsLoaded", app.porletsLoaded);
        $.each(app.porletsLoaded, function (i, item) {
            if (item.porlet == porlet) {
                doLoadFile = false;
                result = item.template;
            }
        });

        if (doLoadFile) {
            result = app.loadTemplate(app.render("{{{path}}}/{{{porlet}}}.html", { porlet: porlet, path: app.modules.main.porletsPath }), porlet);
        }
        return result;
    },
    loadTemplate: function (url, porlet) {
        var id = url.replace(".html", "");
        id = id.replace(/.html/g, "");
        id = id.replace(app.modules.main.porletsPath + '/', "");
        var template = $.ajax({
            type: "GET",
            url: url,
            async: false
        }).responseText;
        app.porletsLoaded.push({ porlet: porlet, template: template });
        return template;
    },
    loadFile: function (filename, filetype) {
        console.log(filename);
        var result = null;
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
        return result;
    }
};