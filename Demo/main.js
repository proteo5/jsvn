﻿app.name = "Concept JSvn";
app.title = "Concept JSvn";
app.description = "This is a Concept application for Javascript View Notation";
app.author = "Alfredo Pinto Molina";
app.settings.externalViews = [];
app.settings.defaultLocalization = "es-MX";
app.settings.supportedLocalization = ["es", "en", "en-US"]
app.hasSession = false;
app.modules.main = {
    type:"main",
    code: {
        start: function () {
            var title = app.render("{{title}} - {{version}}", app);
            $('title').text(title);
            app.settings.viewEngine.settings.externalViews = app.settings.externalViews;
        }
    }
};
