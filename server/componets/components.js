const db = require("../utils/module");
const axios = require("axios");
const TokenGenerator = require("uuid-token-generator");
const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);

const sendtoken = async (hp, token) => {
  try {
    await axios({
      method: "post",
      url: "http://localhost:8000/",
      data: { number: hp, token: token },
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
  }
};
const Alldb = async () => {
  try {
    const getdata = await db.find();
    return getdata;
  } catch (err) {
    console.log(err);
  }
};

const GetRecive = async () => {
  try {
    const getdata = await db.find({ Status: true });
    return getdata;
  } catch (err) {
    console.log(err);
  }
};
const GetOne = async (token) => {
  try {
    const getdata = await db.findOne({ Token: token });
    // console.log(getdata)
    return getdata;
  } catch (err) {
    console.log(err);
  }
};
const GetWait = async () => {
  try {
    const getdata = await db.find({ Status: false });
    return getdata;
  } catch (err) {
    console.log(err);
  }
};

const UpdateUser = async (id) => {
  const UpdateStatus = await db
    .findOneAndUpdate(
      { Token: id, Status: false },
      { TanggalTerima: new Date(), Status: true }
    )
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return UpdateStatus;
};

const DeleteUser = async (id) => {
  const UpdateStatus = await db
    .findOneAndDelete({ _id: id })
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return UpdateStatus;
};

const InsertNew = async (userdata) => {
  const newdb = new db({
    Nama: userdata.Nama,
    Alamat: userdata.Alamat,
    Phone: userdata.Phone,
    Amount: userdata.Amount,
    Token: tokgen.generate(),
    Status: false,
    TanggalTerima: new Date(),
  });
  // Save the document to the database
  try {
    await newdb.save();
    await sendtoken(newdb.Phone, newdb.Token);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports = {
  Alldb,
  GetRecive,
  GetWait,
  InsertNew,
  UpdateUser,
  GetOne,
  DeleteUser,
};
