import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../usercontext";
function Topbar() {
  const { user } = useUser();
  return (
    <>
      <div className="topbar">
        <div>
          <div className="search">
            <FontAwesomeIcon
              className="sidebar-icon-style3"
              icon={faMagnifyingGlass}
              size="lg"
            />
            <input
              className="search-input"
              type="text"
              placeholder="Search something here"
            />
          </div>
        </div>
        <div className="account">
          <img className="theme" src="bell.svg" alt="" />
          <img className="theme" src="sun.svg" alt="" />
          <div className="avatar-color">
            {user && (
              <img
                className="avatar"
                src={user.gravatarUrl}
                alt=""
                style={{ borderRadius: "50%", width: "35px", height: "35px" }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;
