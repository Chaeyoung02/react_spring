import Login from "./Login";
import React from "react";
import SignUp from "./SignUp";
import Main from "./Main";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/sign" element={<SignUp />}></Route>
          <Route path="/main" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App;
