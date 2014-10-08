app.modules.configurations_users = {
    module: "configurations users",
    name: "users configuration Page",
    description: "This is the page to update users",
    view: {
        viewName: 'users configuration',
        elements: [
            {
                "element": "h1",
                "content": "This is the users module"
            },
            {
                "element": "div",
                "id": "div1",
                "style": "color:blue;",
                "content": "This is the content for the users module"
            },
                {
                    "element": "a",
                    "href": "#/index",
                    "content": "back to index"
                }
        ]
    },
    code: {
        start: function () {
            console.log("users configuration starting...");
            app.view(app.modules.configurations_users.view);
            console.log("users configuration modules loaded...");
        }
    }
}
