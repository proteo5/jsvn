app.modules.configurations_sites = {
    module: "configurationsSites",
    name: "sites configuration Page",
    type: "control",
    description: "This is the page to update sites",
    code: {
        start: function () {
            app.view({
                view: {
                    "viewName": "sites",
                    "description": "This view is used when a users sites is called",
                    "viewType": "json",
                    "viewPath": "configurations/",
                    "elements":[]
                },
                place: app.settings.moduleTag
            });
        }
    }
}
