app.modules.configurations_users = {
    module: "configurations users",
    name: "users configuration Page",
    type: "control",
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
                            }
                        ]
                    }
                ]
            },
        { "element": "script", "src": "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js" }
        ]
    },
    code: {
        start: function () {
            app.view({
                view: app.modules.configurations_users.view,
                place: app.settings.moduleTag
            });
        }
    }
}
