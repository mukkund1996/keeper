const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes");

const appPort = process.env.REACT_APP_NOTEKEEPER_DOCKER_PORT;
const mongoClusterName = process.env.MONGO_CLUSTER;
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;
const dbName = process.env.MONGO_DB_NAME;
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
            app.use(cors({
                origin: '*'
            }));            
            app.use("/api/v1", routes);
            app.listen(appPort, () => { console.log("Server started on port 4000.") });
        });
}

main().catch(err => console.log(err));
