const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const allUsersRoutes = require("./routes/getAll");
const updateRoutes = require("./routes/update");
const updateAllRoutes = require("./routes/updateAll");
const deleteRoutes = require("./routes/delete");
const deleteAllRoutes = require("./routes/deleteAll");

const app = express();
dotenv.config();

app.use(express.json({ extended: true }));
app.use(cors());

const PORT = process.env.PORT;
const DB_URL = process.env.DB;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB successfully"))
  .catch((err) => console.log("Could not connect to DB", err));

app.get("/", (req, res) => {
  res.send("Welcome to User admin panel app!");
});

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/all", allUsersRoutes);
app.use("/api/update", updateRoutes);
app.use("/api/updateAll", updateAllRoutes);
app.use("/api/delete", deleteRoutes);
app.use("/api/deleteAll", deleteAllRoutes);

app.listen(PORT, () => console.log(`Listening port: ${PORT}`));
