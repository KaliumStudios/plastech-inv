import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Production from "./components/Production";
import Inventario from "./components/Inventario";
import Fallas from "./components/Fallas";



function App() {
  let component;
  switch (window.location.pathname) {
  case "/":
    // TODO: change the component to the dashboard component 
    component = <Production />;
    break;
  case "/Production":
    component = <Production />;
    break;
  case "/Inventario":
    component = <Inventario />;
    break;
  case "/Fallas":
    component = <Fallas />;
    break;
  }
  return (
    <>
      <Navbar/>
      <div className= " container">
        {component}
      </div>
    </>
  );
}

export default App;
