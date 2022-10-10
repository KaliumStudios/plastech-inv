import React from "react";
import Navbar from "./components/Navbar";
import Production from "./components/Production";
import Inventario from "./components/Inventario";
import Fallas from "./components/Fallas";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { container } from "./styles/Common.styles";

function App() {
  return (
    <>
      <Navbar />
      <div style={container}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Production" element={<Production />} />
          <Route path="/Inventario" element={<Inventario />} />
          <Route path="/Fallas" element={<Fallas />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
