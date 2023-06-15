const express = require("express");
require("dotenv").config();
require("./utils/config");
const route = require("./route/route");
const cors = require("cors");

// const {DeleteUser} = require('./componets/components')

// const body_parser = require("body-parser");
const app = express();
// const {CheckJson, CheckIsiJson} = require("./middleware/middleware")
app.use(
  cors({
    origin: process.env.CORS_CONFIG,
  })
);

app.listen(process.env.PORT);

/*REST API pass to route
but for next like login better make another route
so the midle ware can process or veryfy
*/
app.use("/api", route);

// app.use("/testing/:id",async (req,res) => {
//     const status = await DeleteUser(req.params.id)
//     console.log(status)
//     res.send("ok\n")
// })
