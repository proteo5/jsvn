app.modules.configurations_users = {
    module: "configurations users",
    name: "users configuration Page",
    description: "This is the page to update users",
    model: {},
    view: {
        viewName: 'users configuration',
        view: [
            {
                "porlet": "h1",
                "content": "This is the users module"
            },
            {
                "porlet": "div",
                "id": "div1",
                "style": "color:blue;",
                "content": "This is the content for the users module"
            },
                {
                    "porlet": "a",
                    "href": "#/index",
                    "content": "back to index"
                }
        ]
    },
    code: {
        start: function () {
            var myModel = app.modules.configurations_users.model;

            app.view(app.modules.configurations_users.view, myModel);
            console.log("users configuration modules loaded...");
        }
    }
}
