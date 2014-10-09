app.modules.demo = {
    module: "demoPage",
    name: "demoPage",
    description: "This is the demo page ",
    code: {
        start: function () {
            app.view({
                view: {
                    "viewName": "demo",
                    "description": "This view is used as a demo",
                    "viewType": "html",
                    "viewPath": "",
                    "elements": []
                },
                place: app.settings.bodyTag
            });
        }
    }
}