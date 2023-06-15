import axios from "axios";
import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
const User = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData(); // Call the API when the component mounts
  }, []);
  function doUpdate() {
    document.getElementById("inputnama").value = "";
    document.getElementById("inputalamat").value = "";
    document.getElementById("nohp").value = "";
    document.getElementById("meat").value = "";
    fetchData();
  }
  const DeleteUser = async (ids) => {
    await axios({
      method: "delete",
      url: "http://10.0.0.3:5000/api/delete/" + ids,
    })
      .then((response) => {
        response.status === 200 ? fetchData() : console.log(response);
      })
      .catch((err) => console.log(err));
  };
  const addnew = async () => {
    const wedus = document.getElementsByTagName("input").value;
    const data = {
      Nama: document.getElementById("inputnama").value,
      Alamat: document.getElementById("inputalamat").value,
      Phone: document.getElementById("nohp").value,
      Amount: document.getElementById("meat").value,
    };
    await axios({
      method: "post",
      url: "http://10.0.0.3:5000/api",
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        response.status === 201 ? doUpdate() : console.log(response);
      })
      .catch((err) => console.log(err));
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("http://10.0.0.3:5000/api/all"); // Replace with your API endpoint
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <span>List seleuruh data</span>
      <p id="deskripsi">
        List seluruh user/warga, untuk input data dimulai dengan Nama, Alamat,No
        whatsapp untuk nomer HP pastikan formatnya 628xxxxxx, token tidak akan
        dirim jika nomer tidak benar seperti 08xxx atau +628xxxx, untuk jumlah
        daging disini perkilo jika 5Kg cukup isi 5.
      </p>
      <div className="content">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Alamat</th>
              <th scope="col">No Handphone</th>
              <th scope="col">Jumlah Daging</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, i) => {
              return [
                <tr key={data._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{data.Nama}</td>
                  <td>{data.Alamat}</td>
                  <td>{data.Phone}</td>
                  <td>{data.Amount + " Kg"}</td>
                  <td>
                    <FaTrashAlt
                      onClick={() => DeleteUser(data._id)}
                      className="TrashIcon"
                    />
                  </td>
                </tr>,
              ];
            })}
            <tr>
              <th scope="row">+</th>
              <td>
                <input type="text" id="inputnama" placeholder="Masukkan Nama" />
              </td>
              <td>
                <input
                  type="text"
                  id="inputalamat"
                  placeholder="Masukkan Alamat"
                />
              </td>
              <td>
                <input
                  type="text"
                  id="nohp"
                  placeholder="Masukkan Nomer What'sApp"
                />
              </td>
              <td>
                <input
                  type="text"
                  id="meat"
                  placeholder="Masukkan Jumlah Daging"
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div
          className="submitadd"
          onClick={() => {
            addnew();
          }}
        >
          <button className="btn btn-primary">Submit</button>
        </div>
      </div>
    </>
  );
};

export { User };
