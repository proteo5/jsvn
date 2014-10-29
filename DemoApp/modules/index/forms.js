app.modules.index_forms = {
    module: "forms",
    name: "Forms",
    type: "control",
    description: "This is the forms page",
    code: {
        start: function () {
            app.view({
                view: {
                    "viewName": "forms",
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
