import React, { useEffect, useState } from "react";

import { Dropdown } from "react-bootstrap";
import { useServiceAccount } from "../util/useServiceAccount";
const Header = ({ isOpen, toggleSidebar}) => {
  // const profileImageUrl = http://127.0.0.1:8000/media/profile_images/admin_3XG82wk.png';
  // const profileImageUrl =`http://127.0.0.1:800${user.image_profile}`
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await handleGetUser();
      setUser(userData.data)
      console.log("xxx",user)
    };
 
    fetchUser(); // Ejecuta la función
  }, []);

  const [user,setUser]=useState();
  const { handleGetUser } = useServiceAccount();
  if(!user) return
  return (
    <div className="xl:w-5/6 w-full 2xl:max-w-[1640px] bg-gray-50 grid md:grid-cols-2 grid-cols-12 items-center bg-opacity-95 fixed top-0 z-40 xs:px-8 px-2">
      <div
        className="md:col-span-1 sm:col-span-11 col-span-10 flex gap-4 items-center md:py-0 py-4 bg-inherit"
        onClick={toggleSidebar}
      >
        <button className="block xl:hidden border text-2xl bg-gray-200 w-16 md:w-12 h-12 rounded-md flex items-center justify-center transition hover:bg-gray-300">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
          </svg>
        </button>
      </div>
      <div className="md:col-span-1 sm:col-span-1 col-span-2 items-center justify-end pr-4 md:pr-0">
        <div className="float-right flex gap-4 items-center justify-center">
          <button
            id="menu-button"
            type="button"
            aria-haspopup="menu"
            aria-expanded="false"
          >
            <div className="relative">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="text-2xl hover:text-teal-600"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"></path>
              </svg>
              <span className="absolute -top-2.5 -right-2.5 font-semibold bg-teal-600 rounded-full px-1.5 py-0.5 text-xs text-white text-center">
                5
              </span>
            </div>
          </button>
          <div className="items-center md:flex hidden">
            <div className="text-sm w-full relative">
              <button
                id="user-menu-button"
                type="button"
                aria-haspopup="menu"
                aria-expanded="false"
              >
                <div className="flex gap-4 items-center p-4 rounded-lg">
                  <Dropdown onSelect={null}>
                    <Dropdown.Toggle
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "none",
                        borderRadius: "50%",
                        width: "60px",
                        height: "55px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0px",
                      }}
                      id="dropdown-basic"
                    >
                      <img
                        // src={"../../../../media/profile_image/padmin.png"}
                        // src={profileImageUrl}
                        src={`http://127.0.0.1:8000${user.profile_image}`}
                        alt="user-profile"
                        style={{
                          borderRadius: "50%",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey={true} href="/user-profile">
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item eventKey={false}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {/* <img
                    src="../public/vite.svg"
                    alt="user"
                    className="w-12 border border-gray-300 object-cover h-12 rounded-full"
                  /> */}
                  <p className="text-sm text-gray-500 font-medium">
                    {" "}
                    {user.first_name}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
