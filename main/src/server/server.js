const express = require("express");
const app = express();
let outageRouter = (userRouter = require("./routes/routes"));

app.use(express.json());
app.use("/", outageRouter);
app.use("/outages", outageRouter);
app.use("/outage-new", outageRouter);
app.use("/login", userRouter);
app.use("/signup", userRouter);
app.use("/profile", outageRouter);

const PORT = process.env.PORT || "5000";

//Error Handling
app.use((error, req, res, next) => {
  console.log(error.stack);
  console.log(error.name);
  console.log(error.code);
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
