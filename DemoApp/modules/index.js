app.modules.index = {
    module: "index",
    name: "Home Page",
    type:"page",
    description: "This is our default page",
    model: {},
    
    code: {
        start: function () {
           
            app.view({
                view: {
                    "viewName": "index",
                    "description": "This view is used when a users sites is called",
                    "viewType": "html",
                    "viewPath": "",
                    "elements": []
                },
                place: app.settings.bodyTag
            });
           
            //after load for the theme
            $('#side-menu').metisMenu();
            $(window).bind("load resize", function () {
                topOffset = 50;
                width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
                if (width < 768) {
                    $('div.navbar-collapse').addClass('collapse')
                    topOffset = 100; // 2-row-menu
                } else {
                    $('div.navbar-collapse').removeClass('collapse')
                }

                height = (this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height;
                height = height - topOffset;
                if (height < 1) height = 1;
                if (height > topOffset) {
                    $("#page-wrapper").css("min-height", (height) + "px");
                }
            });

            //load dashboard
            //Load submodule
            app.loadModule('index_dashboard');
        }
    }
}
