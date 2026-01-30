const contactsRoutes = require("./routes/contactsRoutes");
const express = require("express");
const { initDb } = require("./db/mongoConnect");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const port = process.env.PORT || 3000;

// ******* Middleware *********
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// If url starts with. /contacts -> go to contactRoutes file and look for url that matches remaining.
app.use("/contacts", contactsRoutes);

// Base url
app.get("/", (req, res) => {
  res.send("Home");
});


// App Listener and DB Starter
initDb(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });