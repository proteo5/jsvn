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
        localization: "en-US",
        doCache: true,
        viewsPath: "jsvnViews",
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
    getViewHTML: function (view, resources) {
        var elementHTML = "";
        if (view.elements.length == 0) {
            var file = jsvn.loadView(view.viewPath + view.viewName, view.viewType);
            if (view.viewType == "json") {
                var viewJson = $.parseJSON(file);
                elementHTML = jsvn.renderViews(viewJson.elements, resources);
            } else {
                elementHTML = file;
            }
        } else {
            elementHTML = jsvn.renderViews(view.elements, resources);
        }
        if (elementHTML == "") {
            elementHTML = $.parseJSON(jsvn.loadView("shared/viewNotFound", "json"));
        }
        return elementHTML;
    },
    renderViews: function (elements, resources) {
        var elementHTML = "";
        $.each(elements, function (i, item) {
            elementHTML = elementHTML + jsvn.renderElement(item, resources);
        });
        return elementHTML;
    },
    renderElement: function (viewObj, resources) {
        var element = "";
        var attributes = "";
        var content = "";
        $.each(viewObj, function (i, item) {
            switch (i) {
                case "content":
                    content = typeof item == "string" ? item : jsvn.renderViews(item, resources);
                    break;
                case "text":
                    content = marked(item);
                    break;
                case "element":
                    element = item;
                    break;
                case "resource":
                    var currentlyLocalizationText = "";
                    var localizationsProperties = "";
                    if (resources.hasOwnProperty(item)) {
                        $.each(resources[item], function (ii, item2) {
                            if (ii == jsvn.settings.localization) {
                                currentlyLocalizationText = item2;
                            }
                            localizationsProperties = localizationsProperties
                                + jsvn.render("data-localization-{{{code}}}='{{{text}}}' ", { code: ii, text: item2 });
                        });
                        content = jsvn.render("<span class='item-localizated' {{{properties}}}>{{{text}}}</span>",
                            { properties: localizationsProperties, text: marked(currentlyLocalizationText) });
                    }
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
            result = jsvn.loadView(elementName, "html");
        }

        if (result == "") {
            result = "<" + elementName + " {{{attributes}}}" + (content == "" ? " />" : ">{{{content}}}</" + elementName + ">");
        }

        return result;
    },
    loadView: function (viewName, viewType) {
        var url = app.render("{{{path}}}/{{{viewName}}}.{{{viewType}}}", { viewName: viewName, viewType: viewType, path: jsvn.settings.viewsPath })
        var view = "";
        var result = $.ajax({
            type: "GET",
            dataType: viewType,
            url: url,
            async: false
        });

        if (result.status == 200 || result.status == 304) {
            view = result.responseText;
        }

        return view;
    }
};