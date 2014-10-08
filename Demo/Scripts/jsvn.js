// JavaScript View Notation (jsvn) v0.4.0 alfa, http://jsvn.org/
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
        viewsPath: "views",
        templateRender: Mustache, //Default template render http://mustache.github.io/
        externalViews: []
    },
    setVersion: function (version) {
        jsvn.settings.appVersion = version;
    },
    setViewsPath: function (viewsPath) {
        jsvn.settings.viewsPath = viewsPath;
    },
    setCache: function (doCache) {
        jsvn.settings.doCache = doCache;
    },
    render: function (template, data) {
        return jsvn.settings.templateRender.render(template, data);
    },
    renderViews: function (elements) {
        var elementHTML = "";
        $.each(elements, function (i, item) {
            elementHTML = elementHTML + jsvn.renderElement(item);
        });
        return elementHTML;
    },
    renderElement: function (viewObj) {
        var element = "";
        var attributes = "";
        var content = "";
        $.each(viewObj, function (i, item) {
            switch (i) {
                case "content":
                    content = typeof item == "string" ? item : jsvn.renderViews(item);
                    break;
                case "element":
                    element = item;
                    break;
                default:
                    attributes = attributes + jsvn.render("{{{attr}}}='{{{value}}}'", { attr: i, value: item });
            }
        });

        var viewResult = jsvn.getElement(element, content);
        return jsvn.render(viewResult, { attributes: attributes, content: content });
    },
    getElement: function (elementName, content) {
        result = "";
        if (jsvn.settings.externalViews.indexOf(elementName) != -1) {
            result = jsvn.loadView(elementName, content);
        }

        if (result == "") {
            result = "<" + elementName + " {{{attributes}}}" + (content == "" ? " />" : ">{{{content}}}</" + elementName + ">");
        }

        return result;
    },
    loadView: function (viewName, content) {
        var url = app.render("{{{path}}}/{{{viewName}}}.html", { viewName: viewName, path: jsvn.settings.viewsPath })
        var view = "";
        var result = $.ajax({
            type: "GET",
            url: url,
            async: false
        });

        if (result.status == 200 || result.status == 304) {
            view = result.responseText;
        }

        return view;
    }
};