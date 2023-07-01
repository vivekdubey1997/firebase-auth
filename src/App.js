// import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
// import { CgSpinner } from "react-icons/cg";

import React from "react";
import Auth from "./component/auto";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./component/LoginForm";
import TableAntD from "./component/Table";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/table" element={<TableAntD />} />
      </Routes>
      <Auth />
    </div>
  );
};

export default App;
