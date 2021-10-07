const express = require("express");
const app = express();
const outageRouter = require("./routes/routes");

app.use(express.json());
app.use("/outages", outageRouter);
const PORT = process.env.PORT || "3000";

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
