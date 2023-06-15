const mongoose = require("mongoose");
require("dotenv").config();

try {
  mongoose.connect(process.env.MONGO, () => {
    console.log("connected to DB");
  });
} catch (error) {
  console.log(error);
}
