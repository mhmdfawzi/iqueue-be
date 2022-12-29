const express = require("express");
const connectDb = require("./config/db");
const {
  auth,
  serviceProviders,
  spCategories,
  queues,
  reservations,
} = require("./routes/index");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
connectDb();

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "IQueue REST API",
      description:
        "A REST API built with Express and MongoDB. This API provides the behind logic for the SaaS Queuing Portal (IQueue).",
    },
  },
  apis: [
    "./routes/auth.js",
    "./routes/serviceProviders.js",
    "./routes/spCategories.js",
    "./routes/queues.js",
    "./routes/reservations.js",
  ],
};

app.use("/api/auth", auth);
app.use("/api/serviceProviders", serviceProviders);
app.use("/api/spCategories", spCategories);
app.use("/api/queues", queues);
app.use("/api/reservations", reservations);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(process.env.PORT || 5000, () => console.log("Up and running 🚀"));
