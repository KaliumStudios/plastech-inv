import React from "react";
import Navbar from "./components/Navbar";
import Production from "./components/Production";
import Inventario from "./components/Inventario";
import Fallas from "./components/Fallas";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { backgroundColor, container } from "./styles/Common.styles";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import { auth } from "./firebase";
import { User } from "firebase/auth";

type ProtectedRouteProps = {
  user: User | null;
  redirectPath: string;
};
const ProtectedRoute = ({ user, redirectPath }: ProtectedRouteProps) => {
  console.log(user);
  if (!user) {
    return <Navigate to={redirectPath} replace={false} />;
  }

  return <Outlet />;
};

function App() {
  const user = auth.currentUser;

  return (
    <div style={backgroundColor}>
      <Navbar />
      <div style={container}>
        <Routes>
          <Route path="/SignIn" element={<SignIn />} />
          <Route
            element={<ProtectedRoute user={user} redirectPath={"/SignIn"} />}
          >
            <Route path="/Production" element={<Production />} />
            <Route path="/Inventario" element={<Inventario />} />
            <Route path="/Fallas" element={<Fallas />} />
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
