import React from "react";
import Treeview from "./treeview";

function View() {
  return (
    <>
      <div className="home-container">
        <div className="tree-inner-container">
          <h1>Tree View Of Employee Hierarchy</h1>
          <Treeview />
        </div>
      </div>
    </>
  );
}

export default View;
