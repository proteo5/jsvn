
app.name = "Concept JSvn";
app.title = "Concept JSvn";
app.description = "This is a Concept application for Javascript View Notation";
app.version = "0.0.0";
app.athor = "Alfredo Pinto Molina";
app.settings.porletsPath = "app/porlets";
app.settings.initialModule = "index";
app.settings.initialTag = "main-content";
app.modules.main = {
    code: {
        start: function () {
            var title = app.render("{{title}} - {{version}}", app);
            $('title').text(title);
            jsvn.settings.porletsPath = app.settings.porletsPath;
            jsvn.settings.doCache = false; //false for debuggin, default true
            app.loadModule(app.settings.initialModule);
        }
    }
};
app.modules.main.code.start();
