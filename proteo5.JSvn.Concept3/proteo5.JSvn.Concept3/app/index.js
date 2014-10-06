app.modules.index = {
    module: "index",
    name: "Home Page",
    description: "This is our default page",
    model: {},
    view: {
        viewName: 'index',
        view: [
            {
                "porlet": "h1",
                "content": "This is the main Title"
            },
            {
                "porlet": "div",
                "id": "div1",
                "style": "color:blue;",
                "content": "test div 1"
            },
            {
                "porlet": "div",
                "id": "div2",
                "style": "color:red;",
                "content": [{
                    "porlet": "h2",
                    "style": "color:green;",
                    "content": "This is the h2 Title"
                },
                {
                    "porlet": "p",
                    "data-bind": "text: fullName",
                    "content": ""
                },
                {
                    "porlet": "hr"
                },
                {
                    "porlet": "input",
                    "data-bind": "value:firstName"
                },
                {
                    "porlet": "br"
                },
                {
                    "porlet": "input",
                    "data-bind": "value:lastName"
                },
                {
                     "porlet": "br"
                },
                {
                    "porlet": "button",
                    "data-bind": "click: actionButton",
                    "content": "Click Me"
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
            console.log(myModel.firstName() + " " + myModel.lastName());
            alert(myModel.firstName() + " " + myModel.lastName());
        }
    }
}
