app.modules.index = {
    module: "index",
    name: "Home Page",
    description: "This is our default page",
    model: {},
    view: {
        viewName: 'index',
        elements: [
            {
                "element": "h1",
                "content": "This is the main Title"
            },
            {
                "element": "div",
                "id": "div1",
                "style": "color:blue;",
                "content": "test div 1"
            },
            {
                "element": "div",
                "id": "div2",
                "style": "color:red;",
                "content": [{
                    "element": "h2",
                    "style": "color:green;",
                    "content": "This is the h2 Title"
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
                    "content":"Users page"
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
            app.view(app.modules.index.view, myModel);
        },
        actionButton: function () {
            var myModel = app.modules.index.model;
            alert(myModel.firstName() + " " + myModel.lastName());
        }
    }
}
