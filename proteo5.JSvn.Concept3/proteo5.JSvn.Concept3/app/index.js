app.modules.index = {
    module: "index",
    name: "Home Page",
    description: "This is our default page",
    model: null,
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
                    "data-bind": "click: actionButton()",
                    "content": "Click Me"
                }
                ]
            }
        ]
    },
    code: {
        start: function () {
            app.modules.index.model = function () {
                this.firstName = ko.observable('a');
                this.lastName = ko.observable('b');
                this.actionButton = function () { console.log('test') };
                this.fullName = ko.computed(function () {
                    return this.firstName() + " " + this.lastName();
                }, this);
            };
            app.view(app.modules.index.view, app.modules.index.model);
        }
    }
}
$(document).ready(function () {
    app.modules.index.code.start();
});