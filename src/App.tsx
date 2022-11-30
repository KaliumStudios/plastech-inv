import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Production from "./components/Production";
import Inventario from "./components/Inventario";
import Fallas from "./components/Fallas";
import { Route, Routes } from "react-router-dom";
import { backgroundColor, container } from "./styles/Common.styles";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import { auth } from "./firebase";
import { User } from "firebase/auth";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { extractUsernameFromEmail } from "./utils/email-extract";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((newUser) => {
      setCurrentUser(newUser);
    });
  }, []);

  return (
    <div style={backgroundColor}>
      {currentUser ? (
        <Navbar
          userName={
            currentUser.displayName ??
            extractUsernameFromEmail(currentUser.email)
          }
        />
      ) : null}
      <div style={container}>
        <Routes>
          <Route
            element={
              <ProtectedRoute condition={!currentUser} redirectPath="/" />
            }
          >
            <Route path="/SignIn" element={<SignIn />} />
          </Route>
          {/* Logged in */}
          <Route
            element={
              <ProtectedRoute
                condition={!!currentUser}
                redirectPath={"/SignIn"}
              />
            }
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
