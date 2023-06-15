const express = require("express");
const route = express.Router();
require("dotenv").config();
const body_parser = require("body-parser");
var {
  Alldb,
  InsertNew,
  GetWait,
  GetRecive,
  UpdateUser,
  GetOne,
  DeleteUser,
} = require("../componets/components");
const { CheckJson, CheckIsiJson } = require("../middleware/middleware");

route.get("/all", async (req, res) => {
  const data = await Alldb();
  res.status(200).json(data);
});

route.get("/antri", async (req, res) => {
  const data = await GetWait();
  res.status(200).json(data);
});
route.get("/terima", async (req, res) => {
  const data = await GetRecive();
  res.status(200).json(data);
});

route.put("/update/:id", async (req, res) => {
  const tokens = req.params.id;
  const status = await UpdateUser(tokens);
  status
    ? res.status(200).json(await GetOne(tokens))
    : res.status(400).json({ status: "User Has been recive" });
});

route.delete("/delete/:id", async (req, res) => {
  const ids = req.params.id; //get user database id
  const status = await DeleteUser(ids);
  status ? res.status(200).send(true) : res.status(500).send(false);
});

//THIS IS MY MIDLLE WARE TO CHECK JSON THAT SEND BY FRONT END
route.use(body_parser.json());
route.use((err, req, res, next) => CheckJson(err, req, res, next));
route.use((req, res, next) => CheckIsiJson(req, res, next));
route.post("/", async (req, res) => {
  const status = await InsertNew(req.body);
  status
    ? res.status(201).send("User Created")
    : res.status(500).send("Internal Server Error");
});

route.get("/", (req, res) => {
  res.send(404, "ADRESS NOT FOUND");
});

module.exports = route;
