import { useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PatientPage from "./pages/PatientPage";
import PatientFormPage from "./pages/PatientFormPage";
import StudyPage from "./pages/StudyPage";
import StudyFormPage from "./pages/StudyFormPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/SideBar";
import PageSection from "./components/PageSection";
import { BsPeople } from "react-icons/bs";
import UserBar from "./components/UserBar";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app-container">
          {/* <div className="section-pages">
          <PageSection
            name={"Patient"}
            description={'Information about all registered patients'}
            icon={<BsPeople />}
            link={"/patients"}
          />
          <PageSection
            name={"Studies"}
            description={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
            icon={<BsPeople />}
            link={"/studies"}
          />
          <PageSection
            name={"Necropsies"}
            description={"Lorem ipsum dolor sit amet consectetur adipisicing elit."}
            icon={<BsPeople />}
            link={"/"}
          />
        </div> */}
        
          <div className="container-sidebar">
            <Sidebar />
            
          </div>

          <div className="main-content">
            {/* <UserBar/> */}
            <Routes>
              {/* <Route path='/' element={<Navigate to "/">} /> */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/patients" element={<PatientPage />} />
              <Route path="/patient/:id" element={<PatientFormPage />} />
              <Route path="patient/create/" element={<PatientFormPage />} />
              <Route path="/studies/" element={<StudyPage />} />
              <Route path="study/create/:hc/" element={<StudyFormPage />} />
              <Route path="study/:code/" element={<StudyFormPage />} />
            </Routes>
          </div>
        </div>

        <ToastContainer theme="dark" />
      </BrowserRouter>
    </>
  );
}

export default App;
