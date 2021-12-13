const express = require("express");
const app = express();
const Outage = require("./models/Outage");
let outageRouter = (userRouter = require("./routes/routes"));

app.use(express.json());
app.use("/", outageRouter);
app.use("/outages", outageRouter);
app.use("/outage-new", outageRouter);
app.use("/outage-close", outageRouter);
app.use("/outage-extend", outageRouter);
app.use("/login", userRouter);
app.use("/signup", userRouter);
app.use("/profile", outageRouter);
app.use("/reset", userRouter);

const PORT = process.env.PORT || "8000";

//Error Handling
app.use((error, req, res, next) => {
  console.log(error.stack);
  console.log(error.name);
  console.log(error.code);
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  console.log("Closing old outages...");
  Outage.autoCheckOutages();
  console.log("Closed old outages.");
});
