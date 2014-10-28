app.modules.logIn = {
    module: "logIn",
    name: "Log In",
    type: "page",
    description: "This is the page to Log in to the application",
    code: {
        start: function () {
            app.view({
                view: {
                    "viewName": "logIn",
                    "description": "This view is used when a users sites is called",
                    "viewType": "json",
                    "viewPath": "",
                    "elements": []
                },
                place: app.settings.bodyTag
            });
        }
    }
}