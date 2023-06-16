import axios from "axios";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const Whatsapp = () => {
  const [Status, setStatus] = useState("");
  const [Stop, setStop] = useState("");
  const getstate = async () => {
    try {
      const response = await axios.get("http://192.168.0.5:8000/check");
      if (response.data.qrcode) {
        setStatus(response.data);
      }
      if (response.data.status === true) {
        setStop(response.data.status);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    try {
      setTimeout(() => {
        getstate();
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  }, [Status]);
  return (
    <>
      <span>Scan WhatsApp</span>
      <p id="deskripsi">
        Untuk login whatsapp scan qr jika sukses login makan akan ada pesan
        masuk "Whats'App ready" Jika ingin logout bisa melalui apps WhatsApp
        disconnect linked device, kemudian restart seluruh qurbanApp
        system/service
      </p>
      <div className="content">
        <div id="toceteerwa">
          <div className="whatsapp">
            {Stop.length > 2 ? (
              <h1>{Stop}</h1>
            ) : (
              <QRCode
                size={256}
                style={{
                  height: "auto",
                  maxWidth: "50%",
                  width: "50%",
                  border: "solid 10px",
                  borderBlockColor: "white",
                }}
                value={Status.qrcode || ""}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export { Whatsapp };
