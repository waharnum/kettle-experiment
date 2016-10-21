var fluid = require('infusion');
var kettle = require('kettle');
var examples = fluid.registerNamespace("examples");
var apps = require('./src/apps');
var datasources = require('./src/datasources');
var middleware = require('./src/middleware');

fluid.defaults("examples.server", {
    gradeNames: "fluid.component",
    components: {
        server: {
            type: "kettle.server",
            options: {
                rootMiddleware: {
                    validator: {
                        middleware: "{validator}"
                    }
                },
                port: 8081,
                components: {
                    // A basic middleware example
                    validator: {
                        type: "examples.middleware.validator"
                    },
                    // An example of using route parameters
                    // Basic echo service
                    echoer: {
                        type: "examples.app.echoer"
                    },
                    // More complex route parameters
                    // Adds two numbers from the URL together
                    adder: {
                        type: "examples.app.adder"
                    },
                    // Basic datasource usage in a route
                    couchGet: {
                        type: "examples.app.couchGet"
                    }
                }
            }
        }
    }
});

examples.server();
