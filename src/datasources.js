var examples = fluid.registerNamespace("examples");

fluid.defaults("examples.couchDataSource", {
    gradeNames: ["kettle.dataSource.CouchDB", "kettle.dataSource.URL"],
    url: "http://localhost:5984/test/%userId",
    termMap: {
        userId: "%directUserId"
    },
    rules: {
        writePayload: {
            value: ""
        },
        readPayload: {
            "": ""
        }
    }
});
