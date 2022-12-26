const express = require("express");
const connectDb = require("./config/db");
const { auth, serviceProviders } = require("./routes/index");
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
  apis: ["./routes/auth.js","./routes/serviceProviders.js"],
};

// app.use("/catchphrases", catchphrases);
app.use("/api/auth", auth);
app.use("/api/serviceProviders", serviceProviders);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(process.env.PORT || 5000, () => console.log("Up and running 🚀"));
