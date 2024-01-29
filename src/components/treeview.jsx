import React, { useState, useEffect } from "react";
import axios from "axios";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";

function Treeview() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users") // Replace with your API endpoint
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderTree = (node, level) => (
    <TreeView nodeLabel={renderNodeLabel(node)} key={node.email}>
      {data
        .filter((user) => user.manager === node.name)
        .map((childNode) => renderTree(childNode, level + 1))}
    </TreeView>
  );

  const renderNodeLabel = (node) => (
    <span>
      {node.name} ({node.position})
    </span>
  );

  return (
    <div className="tree">
      {data
        .filter((user) => !user.manager)
        .map((rootNode) => renderTree(rootNode, 0))}
    </div>
  );
}

export default Treeview;
