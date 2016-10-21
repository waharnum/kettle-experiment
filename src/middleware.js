var examples = fluid.registerNamespace("examples");

fluid.defaults("examples.middleware.validator", {
    gradeNames: "kettle.middleware",
    invokers: {
        handle: "examples.middleware.validator.handle"
    }
});

examples.middleware.validator.handle = function (request) {
    var togo = fluid.promise();
    // In real middleware, this would be something other than static boolean...
    var isValid = true;
    if (isValid) {
        togo.resolve();
    } else {
        togo.reject({
            isError: true,
            statusCode: 401,
            message: "Invalid!"
        });
    }
    return togo;
};
