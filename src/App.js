import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React, { useState } from "react";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Home from "./components/home";
import Employees from "./components/employees";
import Charts from "./components/charts";
import View from "./components/view";
import { UserProvider } from "./usercontext";
import Userlist from "./components/userlist";
import Usermanagement from "./components/usermanagement";

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/dashboard"
              element={loggedIn ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/view" element={<View />} />
            <Route path="/users" element={<Userlist />} />
            <Route path="/user-management" element={<Usermanagement />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
