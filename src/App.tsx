import React from "react";
import Navbar from "./components/Navbar";
import Production from "./components/Production";
import Inventario from "./components/Inventario";
import Fallas from "./components/Fallas";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { backgroundColor, container } from "./styles/Common.styles";
import Login from "./components/Login";

function App() {
  return (
    <div style={backgroundColor}>
      <Navbar />
      <div style={container}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Production" element={<Production />} />
          <Route path="/Inventario" element={<Inventario />} />
          <Route path="/Fallas" element={<Fallas />} />
          <Route path="/Login" element={<Login/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
