app.modules.configurations_users = {
    module: "configurations users",
    name: "users configuration Page",
    description: "This is the page to update users",
    view: {
        "viewName": "users",
        "description": "This view is used when a users module is called",
        "viewType": "json",
        "elements": [
            {
                "element": "div",
                "class": "container",
                "content": [
                    {
                        "element": "div",
                        "class": "jumbotron",
                        "style": "margin-top: 50px;",
                        "content": [
                            {
                                "element": "h1",
                                "content": "Users Module"
                            },
                            {
                                "element": "p",
                                "content": "This is the content for the Users Module."
                            },
                            {
                                "element": "a",
                                "class": "btn btn-primary btn-lg",
                                "href": "#/index",
                                "content": "Back to Index"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    code: {
        start: function () {
            console.log("users configuration starting...");
            app.view({
                view: app.modules.configurations_users.view,
                place: app.settings.bodyTag
            });
            console.log("users configuration modules loaded...");
        }
    }
}
