//import { useState } from 'react'
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Recive } from "./view/recive";
import { Scan } from "./view/scan";
import { Waiting } from "./view/wait";
import { User } from "./view/user";
import { Layout } from "./view/layout";
import { Whatsapp } from "./view/wa";
const App = () => {
  return (
    <>
      <div className="container-fluid" id="atas">
        <span id="judul">Qurban App</span>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Scan />} />
            <Route path="antri" element={<Waiting />} />
            <Route path="recive" element={<Recive nama="Ayuni" />} />
            <Route path="user" element={<User />} />
            <Route path="wa" element={<Whatsapp />} />
            <Route path="*" element={<Scan />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <div className="footer">
        <span>Copyright 2023</span>
      </div>
    </>
  );
};

export default App;
