const CheckJson = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.sendStatus(400); // Bad request
  }
  next();
};

const CheckIsiJson = (req, res, next) => {
  try {
    const { Nama, Alamat, Phone } = req.body;
    if (!Nama || !Alamat || !Phone) {
      res.status(400).send("BODY MUST CONTAIN Nama, Alamat, Etc.");
    } else {
      next();
    }
  } catch (err) {
    res.send(400);
    console.log(err);
  }
};

module.exports = {
  CheckJson,
  CheckIsiJson,
};
