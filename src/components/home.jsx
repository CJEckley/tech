import React, { useState, useEffect } from "react";
import axios from "axios";
function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users") // Replace with your API endpoint
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const calculateTotalSalary = () => {
    const totalSalary = data.reduce((total, user) => total + user.salary, 0);
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR", // ISO code for Rand
    }).format(totalSalary);
  };

  const calculateTotalEmployees = () => {
    return data.length;
  };

  const calculateTotalSeniorDevelopers = () => {
    const seniorDevelopers = data.filter(
      (user) => user.position === "Senior Developer"
    );
    return seniorDevelopers.length;
  };

  const calculateTotalInterns = () => {
    const interns = data.filter((user) => user.position === "Intern");
    return interns.length;
  };

  return (
    <>
      <div className="dashboard">
        <div className="stats-container">
          <div className="top-dashboard-row">
            <div className="salary-stats-container">
              <p className="salary-stats-heading">Employees Salary Total</p>
              <p className="salary-stats-value">{calculateTotalSalary()}</p>
            </div>
            <div className="salary-stats-container2">
              <p className="salary-stats-heading">Total Employees</p>
              <p className="salary-stats-value">{calculateTotalEmployees()}</p>
            </div>
          </div>
          <div className="second-dashboard-row">
            <div className="salary-stats-container">
              <p className="salary-stats-heading">Total Senior Developers</p>
              <p className="salary-stats-value">
                {calculateTotalSeniorDevelopers()}
              </p>
            </div>
            <div className="salary-stats-container2">
              <p className="salary-stats-heading">Total Interns</p>
              <p className="salary-stats-value">{calculateTotalInterns()}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
