const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const appPort = process.env.NOTEKEEPER_PORT || 4000;
const mongoClusterName = process.env.MONGO_CLUSTER || "notekeeperapp";
const mongoUser = process.env.MONGO_USER || "notekeeper";
const mongoPass = process.env.MONGO_PASS || "VvwQH5YWEswrmDm1";
const dbName = "notesdb";
const uri = `mongodb+srv://${mongoClusterName}:${mongoPass}@${mongoUser}.lc4sl.mongodb.net/${dbName}?retryWrites=true&w=majority`;


// Connect to MongoDB database
async function main() {
    await mongoose
        .connect(uri)
        .then(() => {
            const app = express();
            app.use(express.json({
                type: ['application/json', 'text/plain']
            }));
            app.use("/api/v1", routes);
            app.listen(appPort, () => { console.log("Server started on port 4000.") });
        });
}

main().catch(err => console.log(err));
