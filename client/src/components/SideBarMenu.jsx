import React from "react";
import { Link } from "react-router-dom";
import SideBarMenu from "./SideBarMenu";
const SidebarMenu = ({isOpen}) => {
  return (
    // <div className="col-span-2 xl:block hidden">
    <div className={`col-span-2 xl:block ${isOpen ? "block" : "hidden"} fixed z-10 inset-0 bg-white xl:relative xl:z-auto max-w-fit min-h-screen h-full xl:shadow-lg top-0 `}
    >
      <div className="py-6 px-4 xl:h-screen w-full border-r border-border flex flex-col ">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-2/4 h-12 ml-4 object-contain"
          />
        </Link>

        {/* <div className="flex-colo gap-2 mt-12 fixe "> */}
     <div className="mt-12 flex-grow   ">
          <Link
            to="/home"
            className="bg-text flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-text"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="text-xl text-subMain"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            <p className="text-sm font-medium group-hover:text-subMain text-subMain">
              Dashboard
            </p>
          </Link>
          <Link
            to="/patients"
            className="flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-text"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="text-xl text-subMain"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
              <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
            </svg>
            <p className="text-sm font-medium group-hover:text-subMain text-gray-500">
              Patients
            </p>
          </Link>

        
          <Link
            to="/necropsies"
            className="flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-text"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="text-xl text-subMain"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
            <p className="text-sm font-medium group-hover:text-subMain text-gray-500">
              Necropsias
            </p>
          </Link>

       
          <Link
            to="/doctors"
            className="flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-text"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="text-xl text-subMain"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.841 15.659L18.017 15.836L18.1945 15.659C19.0732 14.7803 20.4978 14.7803 21.3765 15.659C22.2552 16.5377 22.2552 17.9623 21.3765 18.841L18.0178 22.1997L14.659 18.841C13.7803 17.9623 13.7803 16.5377 14.659 15.659C15.5377 14.7803 16.9623 14.7803 17.841 15.659ZM12 14V16C8.68629 16 6 18.6863 6 22H4C4 17.6651 7.44784 14.1355 11.7508 14.0038L12 14ZM12 1C15.315 1 18 3.685 18 7C18 10.2397 15.4357 12.8776 12.225 12.9959L12 13C8.685 13 6 10.315 6 7C6 3.76034 8.56434 1.12237 11.775 1.00414L12 1ZM12 3C9.78957 3 8 4.78957 8 7C8 9.21043 9.78957 11 12 11C14.2104 11 16 9.21043 16 7C16 4.78957 14.2104 3 12 3Z"></path>
            </svg>
            <p className="text-sm font-medium group-hover:text-subMain text-gray-500">
              Doctors
            </p>
          </Link>

          <Link
            to="/studies"
            className="flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-text"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              className="text-xl text-subMain"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zM448 112v336c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zM48 192v256c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16V192H48z"></path>
            </svg>
            <p className="text-sm font-medium group-hover:text-subMain text-gray-500">
              Estudios
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
