import axios from "axios";
import { QrReader } from "react-qr-reader";
import { useEffect, useState } from "react";
const Scan = () => {
  const [data, setData] = useState("");
  const sumitqrdata = async (token) => {
    await axios({
      method: "put",
      url: "http://10.0.0.3:5000/api/update/" + token,
    })
      .then((response) => {
        response.status === 200
          ? setData(response.data.Nama)
          : console.log("eroor dude");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <span>Scan Kode QR</span>
      <p id="deskripsi">
        Setelah menerima Kode Qr atau token silahkan scan Qr pada box dibawah.
      </p>
      <div className="content">
        <div className="container" id="inputarea">
          <QrReader
            className="qrcode"
            onResult={async (result) => {
              if (!!result) {
                await sumitqrdata(result?.text);
              }
            }}
          />
          <div className="fedin">
            <h1>{data === "" ? "Scan disini" : "Terimakasih " + data}</h1>
          </div>
        </div>
      </div>
    </>
  );
};
export { Scan };
