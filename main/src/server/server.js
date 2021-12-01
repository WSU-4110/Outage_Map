const express = require("express");
const app = express();
const path = require("path");
let outageRouter = (userRouter = require("./routes/routes"));

app.use(express.json());
app.disable("etag");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/../../build")));
}
app.use("/", outageRouter);
app.use("/api/outages", outageRouter);
app.use("/api/outage-new", outageRouter);
app.use("/api/outage-close", outageRouter);
app.use("/api/login", userRouter);
app.use("/api/signup", userRouter);
app.use("/api/profile", outageRouter);

const PORT = process.env.PORT || "8000";

//Error Handling
app.use((error, req, res, next) => {
  console.log(error.stack);
  console.log(error.name);
  console.log(error.code);
  next();
});

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../../build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
