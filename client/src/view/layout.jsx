import { Outlet, Link, useLocation } from "react-router-dom";
import {
  FaTasks,
  FaQrcode,
  FaUserClock,
  FaFileExport,
  FaWhatsapp,
  FaTable,
} from "react-icons/fa";
import { Recive } from "./recive";
import { useEffect, useState } from "react";
const Layout = () => {
  const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  return (
    <>
      <div className="container-fluid" id="content1">
        <div className="row">
          <div className="col-2" id="navbar">
            <ul>
              <li className={"underline" + (url === "/" ? " inav" : "")}>
                {" "}
                <Link to="/">
                  <FaQrcode className="icon" />
                  Scan Qr Code
                </Link>
              </li>
              <li className={"underline" + (url === "/user" ? " inav" : "")}>
                {" "}
                <Link to="/user">
                  <FaTable className="icon" />
                  List semua data
                </Link>
              </li>
              <li className={"underline" + (url === "/recive" ? " inav" : "")}>
                <Link to="/recive">
                  <FaTasks className="icon" />
                  Recive
                </Link>
              </li>
              <li className={"underline" + (url === "/antri" ? " inav" : "")}>
                <Link to="/antri">
                  <FaUserClock className="icon" />
                  Inline
                </Link>
              </li>
              <li className={"underline" + (url === "/wa" ? " inav" : "")}>
                <Link to="/wa">
                  <FaWhatsapp className="icon" />
                  Whats'App
                </Link>
              </li>
            </ul>
            <div className="export">
              <FaFileExport className="exporticon" />
            </div>
          </div>
          <div className="col" id="main">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export { Layout };
