app.modules.index_dashboard = {
    module: "Dashboard",
    name: "Dashboard",
    type: "control",
    description: "This is the dashboard page",
    resources: {
        "title": {
            "en-US": "Dashboard Module",
            "es-MX": "Modulo Dashboard"
        },
        "pContent": {
            "en-US": "This is the content for the dashboard Module.",
            "es-MX": "Este es el contenido del modulo"
        }
    },
    view: {
        "viewName": "dashboard",
        "description": "This view is used for dashboards",
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
                                "resource": "title"
                            },
                            {
                                "element": "p",
                                "resource": "pContent"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    code: {
        start: function () {
            app.view({
                view: app.modules.index_dashboard.view,
                place: app.settings.moduleTag,
                resources: app.modules.index_dashboard.resources
            });
        }
    }
}
