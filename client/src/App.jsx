import { useState } from 'react'
import './App.css'
import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import PatientPage from './pages/PatientPage'
import PatientInfoPage from './pages/PatientInfoPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <h1>HOLA aqui va a ir un menu login bla bla</h1> */}
     <BrowserRouter>
            <Routes>
              {/* <Route path='/' element={<Navigate to "/">} /> */}
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/patient' element={<PatientPage/>} />
              <Route path='/patient/:id' element={<PatientInfoPage/>} />
              <Route path='patient/create/' element={<PatientInfoPage/>} />
            </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
