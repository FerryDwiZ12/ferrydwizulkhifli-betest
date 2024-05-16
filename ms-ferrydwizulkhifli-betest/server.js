const express = require("express");
const dotenv = require("dotenv");
const accountLoginRoutes = require("./src/routes/accountLoginRoutes");
const userInfoRoutes = require("./src/routes/userInfoRoutes");
const authRoutes = require("./src/routes/authRoutes");
const userRouter = require("./src/routes/userRoutes");
const atuhRoute = require("./src/routes/authRoutes");
const connectDB = require("./src/config/db");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/account", accountLoginRoutes);
app.use("/api/user", userInfoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/register", userRouter);
app.use("/api/", atuhRoute);

// test endpoint
app.get("/", (_, res) => {
  res.send({
    status: "success",
    message: "Hello from task management backend app",
  });
});

// Connect to MongoDB
connectDB();

const port = process.env.PORT || 3001;
// app.listen(port, () => {
//   console.log(`Server is listening on PORT ${port}`);
// });

module.exports = { app };
