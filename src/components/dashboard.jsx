import React, { useState } from "react";
import Sidebar from "./sidebar";
import Home from "./home";
import Employees from "./employees";
import Topbar from "./topbar";
import View from "./view";
import Charts from "./charts";

function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState("home");

  const handleSidebarClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar onLinkClick={handleSidebarClick} />
        <div className="content">
          <Topbar />
          <div className="selected-component">
            {selectedComponent === "home" && <Home />}
            {selectedComponent === "employees" && <Employees />}
            {selectedComponent === "view" && <View />}
            {selectedComponent === "charts" && <Charts />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
