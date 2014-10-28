app.modules.index = {
    module: "index",
    name: "Home Page",
    type:"page",
    description: "This is our default page",
    model: {},
    resources: {
        "title": {
            "en-US": "This is the main Title",
            "es-MX": "Este es el Titulo Principal"
        },
        "h2Title": {
            "en-US": "This is the h2 Title",
            "es-MX": "Este es el titulo h2"
        },
        "buttonAction": {
            "en-US": "Click Me",
            "es-MX": "Clic Aqui"
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
                    "content": "test p to demostrate what can this do"
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
                          "resource": "buttonAction"
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
                                      "href": "#/index/dashboard",
                                      "text": "Dashboard"
                                  }]
                              },
                              {
                                  "element": "div",
                                  "class": "col-sm-2",
                                  "content": [{
                                      "element": "a",
                                      "href": "#/configurations/users",
                                      "text": "Users page"
                                  }]
                              },
                              {
                                  "element": "div",
                                  "class": "col-sm-2",
                                  "content": [{
                                      "element": "a",
                                      "href": "#/configurations/sites",
                                      "content": "Sites page"
                                  }]
                              },
                              {
                                  "element": "div",
                                  "class": "col-sm-2",
                                  "content": [{
                                      "element": "a",
                                      "href": "#/demo",
                                      "content": "Demo page"
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
                                      "content": "Set Spanish"
                                  }]
                              },
                              {
                                  "element": "div",
                                  "class": "col-sm-2",
                                  "content": [{
                                      "element": "button",
                                      "class": "btn btn-primary",
                                      "data-bind": "click: setLocalizationEnglish",
                                      "content": "Ver en Ingles"
                                  }]
                              }
                          ]
                      }
                    ]
                },
                {
                    "element": "div",
                    "class": "row",
                    "id": "module-content"
                }
              ]
          },
        { "element": "script", "src": "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js" }
        ]
    },
    code: {
        start: function () {
            //Create Model
            var myModel = app.modules.index.model;
            myModel.firstName = ko.observable('a');
            myModel.lastName = ko.observable('b');
            myModel.actionButton = app.modules.index.code.actionButton;
            myModel.setLocalizationEnglish = app.modules.index.code.setLocalizationEnglish;
            myModel.setLocalizationSpanish = app.modules.index.code.setLocalizationSpanish;
            myModel.fullName = ko.computed(function () {
                return this.firstName() + " " + this.lastName();
            }, myModel);

            //Render view
            app.view({
                view: app.modules.index.view,
                viewType: "json",
                place: app.settings.bodyTag,
                resources: app.modules.index.resources
            });
            //Place the bind
            app.bind(myModel, 'div2');

            //Load submodule
            app.loadModule('index_dashboard');
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
