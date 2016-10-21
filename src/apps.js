var examples = fluid.registerNamespace("examples");

fluid.defaults("examples.app.echoer", {
    gradeNames: "kettle.app",
    requestHandlers: {
        echoHandler: {
            "type": "examples.app.echoHandler",
            "route": "/echo/:toEcho",
            "method": "get"
        }
    }
});

fluid.defaults("examples.app.echoHandler", {
    gradeNames: "kettle.request.http",
    invokers: {
        handleRequest: "examples.app.handleEcho"
    }
});

examples.app.handleEcho = function (request) {
    var toEcho = request.req.params.toEcho;
    request.events.onSuccess.fire({
        message: toEcho
    });
};

fluid.defaults("examples.app.adder", {
    gradeNames: "kettle.app",
    requestHandlers: {
        adderHandler: {
            "type": "examples.app.adderHandler",
            "route": "/adder/:left/:right",
            "method": "get"
        }
    }
});

fluid.defaults("examples.app.adderHandler", {
    gradeNames: "kettle.request.http",
    invokers: {
        handleRequest: "examples.app.handleAdder"
    }
});

examples.app.handleAdder = function (request) {
    var params = request.req.params;
    var left = Number(params.left),
        right = Number(params.right);
    var sum = left + right;
    request.events.onSuccess.fire({
        message: sum
    });
};

fluid.defaults("examples.app.couchGet", {
    gradeNames: "kettle.app",
    requestHandlers: {
        adderHandler: {
            "type": "examples.app.couchGetHandler",
            "route": "/couchGet/:userId",
            "method": "get"
        }
    }
});

fluid.defaults("examples.app.couchGetHandler", {
    gradeNames: "kettle.request.http",
    invokers: {
        handleRequest: "examples.app.handleCouchGet"
    }
});

examples.app.handleCouchGet = function (request) {
    var params = request.req.params;
    var userId = params.userId;

    var couchDataSource = examples.couchDataSource();
    var promise = couchDataSource.get({directUserId: userId});

    promise.then(function (response) {
        request.events.onSuccess.fire({
            message: response
        });
    }, function (error) {
        request.events.onError.fire({
            message: error
        });
    });


};

examples.app.wrapJSONResponse = function (json) {
    return "<pre><code>" + json + "</code></pre>";
};
