// JavaScript View Notation (jsvn) v0.2.0 alfa, http://jsvn.org/
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
        doCache: true,
        templatesPath: "app/viewTemplates",
        templateRender: Mustache //Default template render http://mustache.github.io/
    },
    templatesLoaded: [],
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

        var template = jsvn.getTemplate(porlet);
        return jsvn.render(template, { attributes: attributes, content: content });
    },
    getTemplate: function (templateName) {
        var doLoadFile = true;
        var result = null;

        $.each(jsvn.templatesLoaded, function (i, item) {
            if (item.templateName == templateName) {
                doLoadFile = false;
                result = item.template;
            }
        });

        if (doLoadFile) {
            result = jsvn.loadTemplate(templateName);
        }
        return result;
    },
    loadTemplate: function (templateName) {
        var url = app.render("{{{path}}}/{{{templateName}}}.html", { templateName: templateName, path: jsvn.settings.templatesPath })
        var template = "<" + templateName + " {{{attributes}}}>{{{content}}}</" + templateName + ">";
        var result = $.ajax({
            type: "GET",
            url: url,
            async: false
        });
        
        if (result.status == 200 || result.status == 304) {
            template = result.responseText;
        }
        jsvn.templatesLoaded.push({ templateName: templateName, template: template });
        return template;
    }
};