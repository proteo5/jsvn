app.modules.configurations_roles = {
    module: "configurations roles",
    name: "roles configuration Page",
    description: "This is the page to update roles",
    code: {
        start: function () {
            console.log("users configuration starting...");
            app.view({
                view: {
                    "viewName": "users",
                    "description": "This view is used when a users module is called",
                    "viewType": "json",
                    "viewPath": "configurations/roles",
                    "elements":[]
                },
                place: app.settings.bodyTag
            });
            console.log("users configuration modules loaded...");
        }
    }
}
