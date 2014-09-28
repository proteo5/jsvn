app.modules.index = {
    "module": "index",
    "name": "Home Page",
    "Description": "This is our default page",
    "version": "0.1.0.0001",
    "html": [
        {
            "type": "h1",
            "attributes": "",
            "content": "This is the main Title"
        },
        {
            "type": "div",
            "id": "div1",
            "attributes": "style='color:blue;'",
            "content": "test div 1"
        },
        {
            "type": "div",
            "id": "div2",
            "attributes": "style='color:red;'",
            "content": [{
                "type": "p",
                "attributes": "",
                "content": "test p tag"
            }, ]
        }
    ],
    "code": {
        start: function () {
            app.renderModule(app.modules.index.html);
        }
    }
}
app.modules.index.code.start();
