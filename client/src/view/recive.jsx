import axios from "axios";
import { useState, useEffect } from "react";

const Recive = () => {
  function convDate(isoTime) {
    const date = new Date(isoTime);

    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedDate = `${day} ${month} ${year} ${hour}:${minutes}`;
    return formattedDate;
  }
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData(); // Call the API when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://10.0.0.3:5000/api/terima"); // Replace with your API endpoint
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <span>List Daftar Penerima Daging Qurban</span>
      <p id="deskripsi">List penerima daging qurban.</p>
      <div className="content">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Tanggal Menerima</th>
              <th scope="col">Jumlah Daging</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, i) => {
              return [
                <tr key={data._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{data.Nama}</td>
                  <td>{convDate(data.TanggalTerima)}</td>
                  <td>{data.Amount + " Kg"}</td>
                </tr>,
              ];
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export { Recive };
