app.modules.index = {
    module: "index",
    name: "Home Page",
    description: "This is our default page",
    model: {},
    resources: {
        "title": {
            "en-US": "This is the **main** Title",
            "es-MX": "Este es el Titulo **Principal**"
        },
        "h2Title": {
            "en-US": "This is the **h2** Title",
            "es-MX": "Este es el titulo **h2**"
        }
    },
    view: {
        "viewName": "index",
        "description": "This is the view for the index view",
        "viewType": "json",
        "elements": [
          {
              "element": "div",
              "class": "container",
              "content": [
                {
                    "element": "h1",
                    "resource": "title"
                },
                {
                    "element": "p",
                    "style": "color:blue;",
                    "text": "test **p** to demostrate what can this do"
                },
                {
                    "element": "div",
                    "id": "div2",
                    "style": "color:red;",
                    "content": [
                      {
                          "element": "h2",
                          "style": "color:green;",
                          "resource": "h2Title"
                      },
                      {
                          "element": "p",
                          "data-bind": "text: fullName",
                          "content": ""
                      },
                      {
                          "element": "hr"
                      },
                      {
                          "element": "input",
                          "data-bind": "value:firstName"
                      },
                      {
                          "element": "br"
                      },
                      {
                          "element": "input",
                          "data-bind": "value:lastName"
                      },
                      {
                          "element": "br"
                      },
                      {
                          "element": "button",
                          "data-bind": "click: actionButton",
                          "class": "btn btn-primary btn-lg",
                          "content": "Click Me"
                      },
                      {
                          "element": "br"
                      },
                      {
                          "element": "hr"
                      },
                      {
                          "element": "div",
                          "class": "row",
                          "content": [
                              {
                                  "element": "div",
                                  "class": "col-sm-2",
                                  "content": [{
                                      "element": "a",
                                      "href": "#/configurations/users",
                                      "text": "**Users** page"
                                  }]
                              },
                              {
                                  "element": "div",
                                  "class": "col-sm-2",
                                  "content": [{
                                      "element": "a",
                                      "href": "#/configurations/sites",
                                      "text": "**Sites** page"
                                  }]
                              },
                              {
                                  "element": "div",
                                  "class": "col-sm-2",
                                  "content": [{
                                      "element": "a",
                                      "href": "#/demo",
                                      "text": "**Demo** page"
                                  }]
                              }
                          ]
                      },
                      {
                          "element": "hr"
                      },
                      {
                          "element": "div",
                          "class": "row",
                          "content": [
                              {
                                  "element": "div",
                                  "class": "col-sm-2",
                                  "content": [{
                                      "element": "button",
                                      "data-bind": "click: setLocalizationSpanish",
                                      "class": "btn btn-primary",
                                      "text": "Set Spanish"
                                  }]
                              },
                              {
                                  "element": "div",
                                  "class": "col-sm-2",
                                  "content": [{
                                      "element": "button",
                                      "class": "btn btn-primary",
                                      "data-bind": "click: setLocalizationEnglish",
                                      "text": "Ver en Ingles"
                                  }]
                              }
                          ]
                      }
                    ]
                }
              ]
          }
        ]
    },
    code: {
        start: function () {
            var myModel = app.modules.index.model;
            myModel.firstName = ko.observable('a');
            myModel.lastName = ko.observable('b');
            myModel.actionButton = app.modules.index.code.actionButton;
            myModel.setLocalizationEnglish = app.modules.index.code.setLocalizationEnglish;
            myModel.setLocalizationSpanish = app.modules.index.code.setLocalizationSpanish;
            myModel.fullName = ko.computed(function () {
                return this.firstName() + " " + this.lastName();
            }, myModel);
            console.log("res", app.modules.index.resourses);
            app.view({
                view: app.modules.index.view,
                viewType: "json",
                model: myModel,
                modelPlace: app.settings.bodyTag,
                place: app.settings.bodyTag,
                resources: app.modules.index.resources
            });
        },
        actionButton: function () {
            var myModel = app.modules.index.model;
            alert(myModel.firstName() + " " + myModel.lastName());
        },
        setLocalizationSpanish: function () {
            app.setLocalization("es-MX");
        },
        setLocalizationEnglish: function () {
            app.setLocalization("en-US");
        }
    }
}
