describe("property UI", function() {

    var app;
    var el;
    var server;

    before(function() {
       server = sinon.fakeServer.create();

       server.respondWith("GET", /properties\.json/,
            [200, { "Content-Type": "application/json" },
            JSON.stringify(PROPERTY_JSON)]);

       el = document.createElement("div");
       boot(el);

       server.respond()
    });

    after(function() {
        server.restore();
    });

    it("should load property list with default route", function() {
        assert(el.querySelector(".property-list"), "property list attached");
    });

    it("renders properties", function() {
        assert.match(el.innerHTML, /Drury Lane/);
    });

    describe("navigating to detail view", function() {

        before(function(done) {
            Backbone.history.navigate("property/2", {trigger: true});

            waitForViewSwitchAnimation(done);
        });

        after(function() {
            window.location.hash = "";
        });

        it("navigates to property", function() {
            assert.match(el.innerHTML, /Lilac Blvd/);
        });

        it("hides previous view", function() {
            assert.equal(el.querySelectorAll(".property-list").length, 0);
        });

        function waitForViewSwitchAnimation(fn) {
            setTimeout(fn, 175);
        }

    });
    
    var PROPERTY_JSON = [
        { "id": 1, "streetAddress": "123 Drury Lane", "zipCode": 12345, "currentAsk": 230000, "imagePath": "" }, { "id": 2, "streetAddress": "983 Lilac Blvd", "zipCode": 20923, "currentAsk": 1000000, "imagePath": "" }, { "id": 3, "streetAddress": "342 Spruce St", "zipCode": 20923, "currentAsk": 1000000, "imagePath": ""}
    ];
  
});
