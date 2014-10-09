app.name = "Concept JSvn";
app.title = "Concept JSvn";
app.description = "This is a Concept application for Javascript View Notation";
app.author = "Alfredo Pinto Molina";
app.settings.externalViews = [];
app.modules.main = {
    code: {
        start: function () {
            var title = app.render("{{title}} - {{version}}", app);
            $('title').text(title);
            app.settings.viewEngine.settings.externalViews = app.settings.externalViews;
        }
    }
};
