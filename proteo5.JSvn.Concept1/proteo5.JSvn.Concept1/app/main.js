app.modules.main = {
	"app": "Concept JSvn",
    "title": "Concept JSvn",
	"description": "This is a Concept application for Javascript View Notation",
    "version": "0.1.0.0001",
    "author": "Alfredo Pinto Molina",
    "porletsPath": "Scripts/JSvn/Lib",
	"layout": null,
	"initialModule": "index",
	"initialTag": "main-content",
	code: {
		start: function () {
			var title = app.render("{{title}} - {{version}}", app.modules.main);
			$('title').text(title);
			app.loadModule(app.modules.main.initialModule);
		}
	}
};
app.modules.main.code.start();
