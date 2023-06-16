import axios from "axios";
import { useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";

const Waiting = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData(); // Call the API when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://192.168.0.3:5000/api/antri"); // Replace with your API endpoint
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  async function kirimqr(token, nama) {
    try {
      await axios({
        method: "post",
        url: "http://192.168.0.5:8000",
        data: { number: "6282196942074", token: token, nama: nama },
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <span>List Daftar Penerima Daging Qurban</span>
      <p id="deskripsi">
        {" "}
        List antrian penerma daging qurban, Jika ingin mengirim ulang qr code
        tekan icon pesawat
      </p>
      <div className="content">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Alamat</th>
              <th scope="col">Jumlah Daging</th>
              <th scope="col">Kirim Token</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, i) => {
              return [
                <tr key={data._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{data.Nama}</td>
                  <td>{data.Alamat}</td>
                  <td>{data.Amount + " Kg"}</td>
                  <td
                    id="kirim"
                    onClick={() => {
                      kirimqr(data.Token, data.Nama);
                    }}
                  >
                    <IoSend id="kirimico" />
                  </td>
                </tr>,
              ];
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export { Waiting };
