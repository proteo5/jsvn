app.modules.index = {
    module: "index",
    name: "Home Page",
    description: "This is our default page",
    model: {},
    view: {
        "viewName": "index",
        "description":"This is the view for the index view",
        "viewType": "json",
        "elements": [
          {
              "element": "div",
              "class": "container",
              "content": [
                {
                    "element": "h1",
                    "text": "This is the **main** Title"
                },
                {
                    "element": "p",
                    "style": "color:blue;",
                    "text": "test **div 1** to demostrate what can this do"
                },
                {
                    "element": "div",
                    "id": "div2",
                    "style": "color:red;",
                    "content": [
                      {
                          "element": "h2",
                          "style": "color:green;",
                          "text": "This is the **h2** Title"
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
                          "element": "a",
                          "href": "#/configurations/users",
                          "text": "**Users** page"
                      },
                      {
                          "element": "br"
                      },
                      {
                          "element": "hr"
                      },
                      {
                          "element": "a",
                          "href": "#/configurations/sites",
                          "text": "**Sites** page"
                      },
                      {
                          "element": "br"
                      },
                      {
                          "element": "hr"
                      },
                      {
                          "element": "a",
                          "href": "#/demo",
                          "text": "**Demo** page"
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
            myModel.fullName = ko.computed(function () {
                return this.firstName() + " " + this.lastName();
            }, myModel);
            app.view({
                view: app.modules.index.view,
                viewType: "json",
                model: myModel,
                modelPlace: app.settings.bodyTag,
                place: app.settings.bodyTag
            });
        },
        actionButton: function () {
            var myModel = app.modules.index.model;
            alert(myModel.firstName() + " " + myModel.lastName());
        }
    }
}
