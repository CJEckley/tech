// Inside Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Sidebar({ onLinkClick }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        {isCollapsed ? (
          <div className="sidebar-logo-container">
            <img className="sidebar-logo-small " src="logo.svg" alt="logo" />
          </div>
        ) : (
          <div className="sidebar-logo-container">
            <img
              className="sidebar-logo-large "
              src="EPI-USE-logo.svg"
              alt="logo"
            />
          </div>
        )}
        <div
          className={`toggle-container ${
            isCollapsed ? "toggle-container2" : ""
          }`}
        >
          <button onClick={toggleCollapse} className="toggle-button-style">
            <FontAwesomeIcon icon={isCollapsed ? faBars : faTimes} size="xl" />
          </button>
        </div>
        <div className="sidebar-dashboard-section">
          {isCollapsed ? (
            <>
              <div className="header-container2">
                <p></p>
              </div>
              <ul className="sidebar-list-style">
                <li className="sidebar-list-item2" title="Dashboard">
                  <Link
                    className="link-style2"
                    to="#"
                    onClick={() => onLinkClick("home")}
                  >
                    <img src="airplay.svg" alt="" className="iconcolor" />
                  </Link>
                </li>
                <li className="sidebar-list-item2" title="Employees">
                  <Link
                    className="link-style"
                    to="#"
                    onClick={() => onLinkClick("employees")}
                  >
                    <img src="users.svg" alt="" className="iconcolor" />
                  </Link>
                </li>
                <li className="sidebar-list-item2" title="Calendar">
                  <Link
                    className="link-style2"
                    to="#"
                    onClick={() => onLinkClick("view")}
                  >
                    <img src="git-branch.svg" alt="" className="iconcolor" />
                  </Link>
                </li>
                <li className="sidebar-list-item2" title="Charts">
                  <Link
                    className="link-style"
                    to="#"
                    onClick={() => onLinkClick("charts")}
                  >
                    <img src="pie-chart.svg" alt="" className="iconcolor" />
                  </Link>
                </li>
              </ul>
              <div className="header-container2">
                <p></p>
              </div>
              <ul className="sidebar-list-style">
                <li className="sidebar-list-item2" title="Profile">
                  <Link className="link-style2" to="#">
                    <img src="user.svg" alt="" className="iconcolor" />
                  </Link>
                </li>
                <li className="sidebar-list-item2" title="Permissions">
                  <Link className="link-style" to="#">
                    <img src="shield.svg" alt="" className="iconcolor" />
                  </Link>
                </li>
                <li className="sidebar-list-item2" title="Performance">
                  <Link className="link-style2" to="#">
                    <img src="activity.svg" alt="" className="iconcolor" />
                  </Link>
                </li>
                <li className="sidebar-list-item2" title="Chat">
                  <Link className="link-style" to="#">
                    <img
                      src="message-square.svg"
                      alt=""
                      className="iconcolor"
                    />
                  </Link>
                </li>
              </ul>
              <div className="header-container2">
                <p></p>
              </div>
              <ul className="sidebar-list-style">
                <li className="sidebar-list-item2" title="Settings">
                  <Link className="link-style" to="#">
                    <img src="settings.svg" alt="" className="iconcolor" />
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <div className="header-container">
                <p className="sidebar-link-heading">Working Pages</p>
              </div>
              <ul className="sidebar-list-style">
                <li className="sidebar-list-item">
                  <Link
                    className="link-style"
                    to="#"
                    onClick={() => onLinkClick("home")}
                  >
                    <img
                      src="airplay.svg"
                      alt=""
                      className="iconcolor sidebar-icon-style"
                    />
                    <p>Dashboard</p>
                  </Link>
                </li>
                <li className="sidebar-list-item">
                  <Link
                    className="link-style"
                    to="#"
                    onClick={() => onLinkClick("employees")}
                  >
                    <img
                      src="users.svg"
                      alt=""
                      className="iconcolor sidebar-icon-style"
                    />
                    <p>Employees</p>
                  </Link>
                </li>
                <li className="sidebar-list-item">
                  <Link
                    className="link-style"
                    to="#"
                    onClick={() => onLinkClick("view")}
                  >
                    <img
                      src="git-branch.svg"
                      alt=""
                      className="iconcolor sidebar-icon-style"
                    />
                    <p>Employee Tree View</p>
                  </Link>
                </li>
                <li className="sidebar-list-item">
                  <Link
                    className="link-style"
                    to="#"
                    onClick={() => onLinkClick("charts")}
                  >
                    <img
                      src="pie-chart.svg"
                      alt=""
                      className="iconcolor sidebar-icon-style"
                    />
                    <p>Charts</p>
                  </Link>
                </li>
              </ul>
              <div className="header-container">
                <p className="sidebar-link-heading">Just Pages</p>
              </div>
              <ul className="sidebar-list-style">
                <li className="sidebar-list-item">
                  <Link className="link-style">
                    <img
                      src="user.svg"
                      alt=""
                      className="iconcolor sidebar-icon-style"
                    />
                    <p>Profile</p>
                  </Link>
                </li>
                <li className="sidebar-list-item">
                  <Link className="link-style">
                    <img
                      src="shield.svg"
                      alt=""
                      className="iconcolor sidebar-icon-style"
                    />
                    <p>Permissions</p>
                  </Link>
                </li>
                <li className="sidebar-list-item">
                  <Link className="link-style">
                    <img
                      src="activity.svg"
                      alt=""
                      className="iconcolor sidebar-icon-style"
                    />
                    <p>Performance</p>
                  </Link>
                </li>
                <li className="sidebar-list-item">
                  <Link className="link-style">
                    <img
                      src="message-square.svg"
                      alt=""
                      className="iconcolor sidebar-icon-style"
                    />
                    <p>Chat</p>
                  </Link>
                </li>
              </ul>
              <div className="header-container">
                <p className="sidebar-link-heading">Settings</p>
              </div>
              <ul className="sidebar-list-style">
                <li className="sidebar-list-item">
                  <Link className="link-style">
                    <img
                      src="settings.svg"
                      alt=""
                      className="iconcolor sidebar-icon-style"
                    />
                    <p>Settings</p>
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
