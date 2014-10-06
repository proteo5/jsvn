// JavaScript View Notation (jsvn) v0.3.1 alfa, http://jsvn.org/
//
// <copyright file="jsvn.js" company="Alfredo Pinto Molina">
//      Copyright (c) 2014 All Right Reserved
//      License: BSD 3 Clause (http://opensource.org/licenses/BSD-3-Clause)
// </copyright>
// <author>Alfredo Pinto Molina</author>
// <email></email>
// <date>2014-10-29</date>
// <summary></summary>
var jsvn = {
    settings: {
        appVersion: "",
        doCache: true,
        templatesPath: "app/viewTemplates",
        templateRender: Mustache, //Default template render http://mustache.github.io/
        externalPorlets: ''
    },
    setVersion: function (version) {
        jsvn.settings.appVersion = version;
    },
    setTemplatePath: function (templatesPath) {
        jsvn.settings.templatesPath = templatesPath;
    },
    setCache: function (doCache) {
        jsvn.settings.doCache = doCache;
    },
    render: function (template, data) {
        return jsvn.settings.templateRender.render(template, data);
    },
    renderViews: function (viewsObj) {
        var view = "";
        $.each(viewsObj, function (i, item) {
            view = view + jsvn.renderView(item);
        });
        return view;
    },
    renderView: function (viewObj) {
        var porlet = "";
        var attributes = "";
        var content = "";
        $.each(viewObj, function (i, item) {
            switch (i) {
                case "content":
                    content = typeof item == "string" ? item : jsvn.renderViews(item);
                    break;
                case "porlet":
                    porlet = item;
                    break;
                default:
                    attributes = attributes + jsvn.render("{{{attr}}}='{{{value}}}'", { attr: i, value: item });
            }
        });

        var template = jsvn.getTemplate(porlet, content);
        return jsvn.render(template, { attributes: attributes, content: content });
    },
    getTemplate: function (templateName, content) {
        var result = null;
        if (jsvn.settings.doCache) {
            result = locache.get(jsvn.settings.appVersion + "-t-" + templateName);
        }
        if (result == null) {
            result = jsvn.loadTemplate(templateName, content);
            if (jsvn.settings.doCache) {
                locache.set(jsvn.settings.appVersion + "-t-" + templateName, result, 3600);
            }
        }
        return result;
    },
    loadTemplate: function (templateName, content) {
        var template = "<" + templateName + " {{{attributes}}}" + (content == "" ? " />" : ">{{{content}}}</" + templateName + ">");
        if (jsvn.settings.externalPorlets.indexOf(templateName) != -1) {
            var url = app.render("{{{path}}}/{{{templateName}}}.html", { templateName: templateName, path: jsvn.settings.templatesPath })

            var result = $.ajax({
                type: "GET",
                url: url,
                async: false
            });

            if (result.status == 200 || result.status == 304) {
                template = result.responseText;
            }
        }
        return template;
    }
};