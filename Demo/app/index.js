app.modules.index = {
    module: "index",
    name: "Home Page",
    description: "This is our default page",
    view: [
        {
            "porlet": "h1",
            "content": "This is the main Title"
        },
        {
            "porlet": "div",
            "id": "div1",
            "style": "color:blue;",
            "content": "test div 1"
        },
        {
            "porlet": "div",
            "id": "div2",
            "style": "color:red;",
            "content": [{
                "porlet": "h2",
                "style": "color:green;",
                "content": "This is the h2 Title"
            },
            {
                "porlet": "p",
                "content": "test p tag"
            }]
        }
    ],
    code: {
        start: function () {
            app.view(app.modules.index.view);
        }
    }
}
$(document).ready(function () {
    app.modules.index.code.start();
});