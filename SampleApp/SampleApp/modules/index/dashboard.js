app.modules.index_dashboard = {
    module: "Dashboard",
    name: "Dashboard",
    type: "control",
    description: "This is the dashboard page",
    code: {
        start: function () {
            app.view({
                view: {
                    "viewName": "dashboard",
                    "description": "This is the view for the dashboard",
                    "viewType": "html",
                    "viewPath": "index/",
                    "elements": []
                },
                place: app.settings.moduleTag
            });
        }
    }
}
