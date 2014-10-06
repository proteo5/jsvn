app.name = "Concept JSvn";
app.title = "Concept JSvn";
app.description = "This is a Concept application for Javascript View Notation";
app.author = "Alfredo Pinto Molina";
app.settings.porletsPath = "app/porlets";
app.settings.initialModule = "index";
app.settings.initialTag = "main-content";
app.settings.externalPorlets = ['div','h1','p'];
app.modules.main = {
    code: {
        start: function () {
            var title = app.render("{{title}} - {{version}}", app);
            $('title').text(title);
            app.settings.viewEngine.settings.externalPorlets = app.settings.externalPorlets;
            app.loadModule(app.settings.initialModule);
        }
    }
};
